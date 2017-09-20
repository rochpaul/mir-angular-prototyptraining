import { Component, OnInit } from '@angular/core';
import {TreeModel} from "ng2-tree";
import {appConfig} from '../../app.config';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-navigation-builder',
  templateUrl: './navigation-builder.component.html',
  styleUrls: ['./navigation-builder.component.css']
})
export class NavigationBuilderComponent implements OnInit {

  /*
   * api reference https://github.com/valor-software/ng2-tree
   */
  ckeditorContent = `<p>My HTML</p>`;
  // public tree: TreeModel = {
  //   value: 'Navigation Settings',
  //   children: [
  //     {
  //       value: 'Default',
  //       children: [
  //         {value: 'navigation.xml'},
  //         {value: 'impressum.xml'},
  //         {value: 'contact.xml'}
  //       ]
  //     },
  //   ]
  // };

  constructor(private http: HttpClient) {
  }


  save($event) {

    if (typeof this.ckeditorContent === 'string')
    {

      console.log(this.ckeditorContent);
    }


    var json = JSON.stringify(this.ckeditorContent);

    let body = JSON.stringify({ 'foo': 'bar' });
    let headers = new Headers({ 'Content-Type': 'application/json' });


    this.http.post( appConfig.serverUrl + "/mir/api/v1/fileaccess/create5", this.ckeditorContent)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }


  ngOnInit() {

  }

}
