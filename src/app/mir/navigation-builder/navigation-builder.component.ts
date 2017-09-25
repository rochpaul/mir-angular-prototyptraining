import {Component, OnInit, ViewChild} from '@angular/core';
import {TreeModel} from "ng2-tree";
import {appConfig} from '../../app.config';

import {HttpClient} from '@angular/common/http';
import {MarkNavigationElementsService} from "../../services/navigation/mark-navigation-elements.service";
import {McrmessagesService} from "../../services/mcrmessages/mcrmessages.service";
import {TranslateService} from "@ngx-translate/core";

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
  public tree: TreeModel = {
    value: 'Navigationseinstellungen',
    id: 1,
    children: [
      {
        value: 'Vorgegeben',
        id: 2,
        children: [
          {
            value: 'Header',
            id: 3,
            children: [
              {value: 'Hauptleiste', id: 4,},
              {value: 'Benutzermenü', id: 5},
            ]
          },
          {
            value: 'Footer', id: 'navigation.default.footer',
            children: [
              {
                value: 'Mir Menü', id: 'navigation.default.footer.menu',
                children: [
                  {value: 'Start', id: 'navigation.default.footer.menu.start'},
                  {value: 'Impressum', id: 'navigation.default.footer.menu.impressum'},
                  {value: 'Kontakt', id: 'navigation.default.footer.menu.contact'}
                ]
              }
            ]
          },
        ]
      },
    ]
  };

  constructor(private translateService: TranslateService,
              private http: HttpClient,
              private markElementsService: MarkNavigationElementsService,
              private mcrmessagesService: McrmessagesService) {


    this.mcrmessagesService.getMessagesFromComponent().subscribe(mcrmessageKeys => {

      for (let mcrmessageKey of mcrmessageKeys) {

        console.log(mcrmessageKey);
        translateService.get('messages.' + mcrmessageKey).subscribe(
          mcrMessageProperty => {
            console.log(mcrMessageProperty);
          }
        )
      }
    });
  }

  @ViewChild('treeComponent') treeComponent;

  ngAfterViewInit(): void {

  }

  handleSelected($event) {

    this.markElementsService.sendNavigationId($event.node.node.id);
  }

  // save($event) {
  //
  //   if (typeof this.ckeditorContent === 'string') {
  //
  //     console.log(this.ckeditorContent);
  //   }
  //
  //
  //   var json = JSON.stringify(this.ckeditorContent);
  //
  //   let body = JSON.stringify({'foo': 'bar'});
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //
  //
  //   this.http.post(appConfig.serverUrl + "/mir/api/v1/fileaccess/create5", this.ckeditorContent)
  //     .subscribe(
  //       res => {
  //         console.log(res);
  //       },
  //       err => {
  //         console.log("Error occured");
  //       }
  //     );
  // }


  ngOnInit() {

  }

}
