import {Component, OnInit, ViewChild} from '@angular/core';
import {ComponentBrowserComponent} from "../component-browser/component-browser.component";

@Component({
  selector: 'app-wcms3main',
  templateUrl: './wcms3main.component.html',
  styleUrls: ['./wcms3main.component.css']
})
export class Wcms3mainComponent implements OnInit {

  @ViewChild(ComponentBrowserComponent) componentBrowser : ComponentBrowserComponent;

  constructor() { }

  ngOnInit() {
  }
}
