import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from "rxjs/Observable";


import {HttpClientModule, HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class MCRMessagesLoader implements TranslateLoader {

  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string): Observable<any> {

    var messagesURL = "http://localhost:8080/mir/api/v1/messages?format=json&lang=" + lang;

    return Observable.create(observer => {

      // Make the HTTP request:
      this.http.get(messagesURL).subscribe(response => {
        // Read the result field from the JSON response.

        console.log('It works here')
        console.log(response);

        observer.next(<any>response);
        observer.complete();

      });
    });
  }
}
