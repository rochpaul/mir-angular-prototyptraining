import { Component, OnInit } from '@angular/core';
import {TreeModel} from "ng2-tree";

@Component({
  selector: 'app-navigation-builder',
  templateUrl: './navigation-builder.component.html',
  styleUrls: ['./navigation-builder.component.css']
})
export class NavigationBuilderComponent implements OnInit {

  /*
   * api reference https://github.com/valor-software/ng2-tree
   */

  public tree: TreeModel = {
    value: 'Navigation Settings',
    children: [
      {
        value: 'Default',
        children: [
          {value: 'navigation.xml'},
          {value: 'impressum.xml'},
          {value: 'contact.xml'}
        ]
      },
    ]
  };

  constructor() {

  }

  ngOnInit() {

  }

}
