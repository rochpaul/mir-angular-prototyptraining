import {Injectable, Type} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {getAnnotation} from "../../../annotation";
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrMessagesModel} from "./mcrmessages.model";
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../../app.config";
import {IMCRLanguage} from "./mcrlanguage.model";

@Injectable()
export class McrmessagesService {

  private mcrmessagesSubject = new Subject<McrMessagesModel[]>();
  private mcrLanguageSubject = new Subject<String>();

  constructor(private translateService: TranslateService,
              private logger: NGXLogger,
              private http: HttpClient) {
  }

  sendMCRMessagesFromComponent(component: Type<any>) {

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

              if (this.translateService.currentLang) {

                mcrmessages.push(new McrMessagesModel(trimmedPart, mcrMessageValue,
                  this.translateService.currentLang));
              } else {
                mcrmessages.push(new McrMessagesModel(trimmedPart, mcrMessageValue,
                  this.translateService.getDefaultLang()));
              }
            });
        }
      }
    }

    //"FooterComponent: request for message.properties in language " + translate.currentLang + );

    this.mcrmessagesSubject.next(mcrmessages);
  }

  clearMCRMessagesSubject() {
    this.mcrmessagesSubject.next();
  }

  getMCRMessagesFromComponent(): Observable < McrMessagesModel[] > {
    return this.mcrmessagesSubject.asObservable();
  }

  sendMCRLanguageChange(mcrLanguage: string) {

    this.mcrLanguageSubject.next(mcrLanguage);
  }

  clearMCRLanguageChangeSubject() {
    this.mcrLanguageSubject.next();
  }

  getMCRLanguageChangeSubject(): Observable < String > {
    return this.mcrLanguageSubject.asObservable();
  }

// Rest Services

  getAvailableLanguages(): Observable<IMCRLanguage> {

    return this.http.get<IMCRLanguage>(appConfig.serverUrl + "/mir/api/v1/messages/availablelang?format=json");
  }
}
