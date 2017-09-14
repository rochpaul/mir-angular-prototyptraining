import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {appConfig} from "../../app.config";
import {Router} from "@angular/router";

@Injectable()
export class MCRServerStatusService {

  constructor(private http: HttpClient, private router: Router ) {

    this.http.get(appConfig.serverUrl + "/mir/api/v1/mycore/version").subscribe(
      response => {

        console.log("server is up");

      },
      (err: HttpErrorResponse) => {

        if (err.error instanceof Error) {

          console.log("Client-side Error occured");
        } else {
          console.log("Server-side Error occured");
        }
      });
  }
}


