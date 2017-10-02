import {Injectable, Type} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {getAnnotation} from "../../../annotation";
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrMessagesModel} from "./mcrmessages.model";
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../../app.config";
import {IMCRLanguage} from "./mcrlanguage.model";
import {McrMessagesServiceModel} from "./mcrmessagesService.model";

@Injectable()
export class McrmessagesService {

  private mcrMessageServiceSubject = new Subject<McrMessagesServiceModel>();

  private mcrLanguageSubject = new Subject<String>();

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

    let componentDecorators = getAnnotation(component);
    let componentTemplate = componentDecorators['template'];

    /*
     * first get all strings between messages. and translate
     */
    let splittedTemplate = componentTemplate.split(/messages([\s\S]*?)translate/);

    const suffixStart = '.';
    const suffixEnd = '|';

    let mcrmessageValues: string[] = new Array();
    let mcrmessages: McrMessagesModel[] = new Array();
    let mcrmessageServiceModel: McrMessagesServiceModel;


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
    if (this.translateService.currentLang) {

      mcrmessageServiceModel = new McrMessagesServiceModel(mcrmessages,
        this.translateService.currentLang, component);
    } else {
      mcrmessageServiceModel = new McrMessagesServiceModel(mcrmessages,
        this.translateService.getDefaultLang(), component);
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
  sendMCRLanguageChange(mcrLanguage: string) {

    this.mcrLanguageSubject.next(mcrLanguage);
  }

  clearMCRLanguageChangeSubject() {
    this.mcrLanguageSubject.next();
  }

  /*
   * subscriber for MCR language change
   */
  getMCRLanguageChangeSubject(): Observable < String > {
    return this.mcrLanguageSubject.asObservable();
  }

// Rest Services

  getAvailableLanguages(): Observable<IMCRLanguage> {

    return this.http.get<IMCRLanguage>(appConfig.serverUrl + "/mir/api/v1/messages/availablelang?format=json");
  }
}
