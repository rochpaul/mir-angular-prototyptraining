import {Injectable, Type} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {getAnnotation} from "../../../annotation";
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class McrmessagesService {

  private messagesSubject = new Subject<string[]>();

  constructor(private translate: TranslateService, private logger: NGXLogger,) {
  }

  sendMessagesFromComponent(component: Type<any>) {

    let componentDecorators = getAnnotation(component);
    let componentTemplate = componentDecorators['template'];

    /*
     * first get all strings between messages. and translate
     */
    let splittedTemplate = componentTemplate.split(/messages([\s\S]*?)translate/);

    const suffixStart = '.';
    const suffixEnd = '|';

    let messages: string[] = new Array();

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
        trimmedPart = trimmedPart.replace("' " + suffixEnd, "");

        if (!(messages.indexOf(trimmedPart) > -1)) {
          messages.push(trimmedPart);
        }
      }
    }

    //"FooterComponent: request for message.properties in language " + translate.currentLang + );

    this.messagesSubject.next(messages);
  }

  clearMessagesFromComponent() {
    this.messagesSubject.next();
  }

  getMessagesFromComponent(): Observable<string[]> {
    return this.messagesSubject.asObservable();
  }

}
