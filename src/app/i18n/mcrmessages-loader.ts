import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from "rxjs/Observable";
import {appConfig} from '../app.config';


import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class MCRMessagesLoader implements TranslateLoader {

  constructor(private http: HttpClient, private router: Router) {
  }

  getTranslation(lang: string): Observable<any> {

    var messagesURL = appConfig.serverUrl + "/mir/api/v1/messages?format=json&lang=" + lang;

    return Observable.create(observer => {

      // Make the HTTP request:
      this.http.get(messagesURL).subscribe(response => {
        // Read the result field from the JSON response.

        console.log('It works here')
        console.log(response);

        observer.next(<any>response);
        observer.complete();

      },
      err => {
        console.log('Something went wrong!');

        this.router.navigate(["/error"]);
        return Observable.of(null);
      }

      );
    });
  }
}
