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
}




