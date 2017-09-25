import {Injectable, Type} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {getAnnotation} from "../../../annotation";

@Injectable()
export class MarkNavigationElementsService {

  private navigationSubject = new Subject<any>();

  constructor() {
  }

  sendNavigationId(navigationId: string) {
    this.navigationSubject.next({text: navigationId});
  }

  clearNavigationId() {
    this.navigationSubject.next();
  }

  getNavigationId(): Observable<any> {
    return this.navigationSubject.asObservable();
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
        trimmedPart = trimmedPart.replace(suffixEnd, "");

        if (!(messages.indexOf(trimmedPart) > -1)) {
          messages.push(trimmedPart);
        }
      }
    }

    console.log(messages);
  }
}




