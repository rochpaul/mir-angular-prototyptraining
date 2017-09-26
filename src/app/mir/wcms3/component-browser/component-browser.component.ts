import {
  Component, OnInit, ApplicationRef, Injector, ElementRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory
} from '@angular/core';


@Component({
  selector: 'app-component-browser',
  templateUrl: './component-browser.component.html',
  styleUrls: ['./component-browser.component.css']
})
export class ComponentBrowserComponent implements OnInit {


  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    //let element: ElementRef = this._app['_rootComponents'][0].location;

    console.log(componentFactoryResolver);
    
  }


  ngOnInit() {


  }

}
