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

    var regex = "[\n\r].*messages.\s*([^\n\r]*)";
    var test = componentTemplate.match(regex);


    console.log(test);


  }

}
