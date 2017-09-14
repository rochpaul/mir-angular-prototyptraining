import {Injectable} from '@angular/core';
import {appConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {IMCRLanguage} from "./mcrlanguage";
import {Observable} from "rxjs";

@Injectable()
export class MCRLanguageService {

  constructor(private http: HttpClient) {
  }

  getAvailableLanguages(): Observable<IMCRLanguage> {

    return this.http.get<IMCRLanguage>(appConfig.serverUrl + "/mir/api/v1/messages/availablelang?format=json");
  }
}
