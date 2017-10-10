import {Injectable, Type} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {getAnnotation} from "../../../annotation";
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrMessagesModel} from "./mcrmessages.model";
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {appConfig} from "../../app.config";
import {McrMessagesServiceModel} from "./mcrmessagesService.model";
import {McrMessagesServerModel} from "./mcrmessagesServer.model";
import {IMCRLanguageParams} from "./mcrlanguage.params.model";

@Injectable()
export class McrmessagesService {

  private mcrMessageServiceSubject = new Subject<McrMessagesServiceModel>();

  private mcrLanguageParamsSubject = new Subject<IMCRLanguageParams>();

  mcrlanguageParams: IMCRLanguageParams;

  constructor(private translateService: TranslateService,
              private logger: NGXLogger,
              private http: HttpClient) {
  }

  /**
   *
   * dissolve all required Message information for the given component
   *
   * @param component for dissolve Message Information as McrMessageServiceModel
   */
  sendServiceModelFromComponent(component: Type<any>) {

    let mcrmessageValues: string[] = new Array();
    let mcrmessages: McrMessagesModel[] = new Array();
    let mcrmessageServiceModel: McrMessagesServiceModel = null;

    let componentDecorators = getAnnotation(component);
    let componentTemplate = componentDecorators['template'];

    /*
     * first get all strings between messages. and translate
     */
    let splittedTemplate = componentTemplate.split(/messages([\s\S]*?)translate/);

    const suffixStart = '.';
    const suffixEnd = '|';

    /*
     * resolve key / values with trimmed message part
     */
    for (let templatePart of splittedTemplate) {

      let trimmedPart = templatePart.trim();

      /*
       * get only correct messages
       */
      if (trimmedPart.substring(0, suffixStart.length) === suffixStart &&
        trimmedPart.indexOf(suffixEnd, trimmedPart.length - suffixEnd.length) !== -1) {

        trimmedPart = trimmedPart.substring(1, trimmedPart.length);

        /*
         * remove whitespaces!
         */
        trimmedPart = trimmedPart.replace(/ /g, '')
        trimmedPart = trimmedPart.replace("'" + suffixEnd, "");

        if (!(mcrmessageValues.indexOf(trimmedPart) > -1)) {
          mcrmessageValues.push(trimmedPart);

          this.translateService.get('messages.' + trimmedPart).subscribe(
            mcrMessageValue => {

              mcrmessages.push(new McrMessagesModel(trimmedPart, mcrMessageValue));
            });
        }
      }
    }

    /*
     * complete mcr message information with adding current language information and associated component
     */
    if (this.mcrlanguageParams) {

      mcrmessageServiceModel = new McrMessagesServiceModel(mcrmessages,
        this.mcrlanguageParams.currentLang, this.mcrlanguageParams.defaultLang, component);
    } else {

      //mcrmessageServiceModel = new McrMessagesServiceModel(mcrmessages,
      //  this.translateService.getDefaultLang(), component);
    }

    /*
     * let's send it
     */
    this.mcrMessageServiceSubject.next(mcrmessageServiceModel);
  }

  clearMCRMessageServiceSubject() {
    this.mcrMessageServiceSubject.next();
  }

  /*
   * subscriber for MCR Message Service Model
   */
  getMCRMessageModelFromComponent(): Observable < McrMessagesServiceModel > {
    return this.mcrMessageServiceSubject.asObservable();
  }

  /*
   * send some change in mcr language
   */
  sendMCRLanguageParamsSubject(mcrLanguageParams: IMCRLanguageParams) {

    this.mcrLanguageParamsSubject.next(mcrLanguageParams);
  }

  clearMCRLanguageParamsSubject() {
    this.mcrLanguageParamsSubject.next();
  }

  /*
   * subscriber for MCR language change
   */
  getMCRLanguageParamsSubject(): Observable <IMCRLanguageParams> {
    return this.mcrLanguageParamsSubject.asObservable();
  }

  switchLanguage(mcrLanguageParams: IMCRLanguageParams) {

    this.logger.info('McrmessagesServic: switchLanguage() - Switch language to ' + mcrLanguageParams.currentLang);

    this.translateService.use(mcrLanguageParams.currentLang).subscribe(response => {

      /*
       * inform other components
       */
      this.sendMCRLanguageParamsSubject(mcrLanguageParams);

    });

  }

// Rest Services

  getAvailableLanguages(): Observable<IMCRLanguageParams> {


    return Observable.create(observer => {

      this.http.get<IMCRLanguageParams>(appConfig.serverUrl + "/mir/api/v1/messages/availablelang?format=json").subscribe(
        mcrlanguageParams => {


          this.logger.info('McrmessagesService.getAvailableLanguages(): ' + mcrlanguageParams.availablelang);
          this.mcrlanguageParams = mcrlanguageParams;

          /*
           * handling standard language
           */
          let browserlang = this.translateService.getBrowserLang();

          this.logger.info('McrmessagesService.getAvailableLanguages(): Set MCR Standard language');

          if (mcrlanguageParams.availablelang.indexOf(browserlang) !== -1) {

            this.mcrlanguageParams.currentLang = browserlang;

            this.logger.info('McrmessagesService.getAvailableLanguages(): Default browser language was detected under available languages');
            this.logger.info('McrmessagesService.getAvailableLanguages(): Set MCR Standard language to: ' + this.mcrlanguageParams.currentLang);

          } else {

            this.mcrlanguageParams.currentLang = this.mcrlanguageParams.availablelang[0];

            this.logger.warn('McrmessagesService.getAvailableLanguages(): Default browser language "' + browserlang + '" is not defined in MCR languages. Set ' +
              'first available mcr language as standard: ' + this.mcrlanguageParams.currentLang);
          }

          this.translateService.setDefaultLang(this.mcrlanguageParams.currentLang);


          /*
           * handle mcrlanguageParams on other components
           */
          observer.next(<IMCRLanguageParams> mcrlanguageParams);
          observer.complete();
        },
        (err: HttpErrorResponse) => {

          if (err.error instanceof Error) {

            console.log("MCRLanguageService.getAvailableLanguages(): Client-side Error occured");
          } else {
            console.log("MCRLanguageService.getAvailableLanguages(): Server-side Error occured");
          }

          return Observable.of(null);
        });
    });
  }

  updateMcrMessages(mcrMessagesServiceModel: McrMessagesServerModel) {

    this.logger.info("McrmessagesService: updateMcrMessages(mcrMessagesServiceModel) - Start to update mcr messages")

    let body = JSON.stringify(mcrMessagesServiceModel);

    this.http
      .post(appConfig.serverUrl + "/mir/api/v1/messages/updateMessageProperties", body, {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      })
      // See below - subscribe() is still necessary when using post().
      .subscribe();

  }
}
