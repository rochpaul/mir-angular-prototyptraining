import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MCRServerStatusService} from "./services/serverstatus/mcrserver-status.service";

@Component({
  selector: 'mir-app-starter',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private serverStatusService: MCRServerStatusService) {
  }

  ngOnInit() {

  }
}
