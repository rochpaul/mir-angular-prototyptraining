import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from "rxjs/Observable";
import {appConfig} from '../app.config';

import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class MCRMessagesLoader implements TranslateLoader {

  constructor(private http: HttpClient, private logger: NGXLogger) {
  }
  getTranslation(lang: string): Observable<any> {

    var messagesURL = appConfig.serverUrl + "/mir/api/v1/messages?format=json&lang=" + lang;

    return Observable.create(observer => {

      // Make the HTTP request:
      this.http.get(messagesURL).subscribe(response => {
          // Read the result field from the JSON response.
          this.logger.info('MCRMessagesLoader: Cache messages from Server in Language "' + lang + '".');
          console.log(response);

          observer.next(<any>response);
          observer.complete();

        },
        err => {

          this.logger.error('MCRMessagesLoader: Server Side error occured.');

          console.log('Something went wrong!');

          return Observable.of(null);
        }
      );
    });
  }
}
