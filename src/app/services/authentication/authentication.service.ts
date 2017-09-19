import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {appConfig} from "../../app.config";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  registerLocalUser(localUser: string[]): Observable<any> {

    var authorizationURL = appConfig.serverUrl + "/mir/api/v1/auth";

    /*
     * get the server public key
     */
    return Observable.create(observer => {

      // Make the HTTP request:
      this.http.get(authorizationURL, {observe: 'response'}).subscribe(

        res => {

        console.log(res.headers);

        console.log(res.headers.get('Authorization'));
        // you can assign the value to any variable here
        // Read the result field from the JSON response.

      }, (err: HttpErrorResponse) => {

        if (err.error instanceof Error) {

          console.log("Client-side Error occured");
        } else {
          console.log("Server-side Error occured");
        }
      });


      console.log(localUser);
    });
  }
}
