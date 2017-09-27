import {
  Component, OnInit, ApplicationRef, Injector, ElementRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TreeModel} from "ng2-tree";

export class ComponentBrowserModel {

  value: string;
  id?: string;
  children?: ComponentBrowserModel[];

  constructor(id, value, children) {

    this.value = value;
    this.id = id;
    this.children = children;
  }
}


@Component({
  selector: 'app-component-browser',
  templateUrl: './component-browser.component.html',
  styleUrls: ['./component-browser.component.css']
})
export class ComponentBrowserComponent implements OnInit {

  //let element: ElementRef = this._app['_rootComponents'][0].location;
  tree: TreeModel;


  constructor(private app: ApplicationRef, private route: Router) {
    /*
     * first step get root
     */

    let elementRef: ElementRef = this.app['_rootComponents'][0].location;

    /*
     * get route configuration!
     */
    let routeconfig = this.route.config;

    //this.tree = elementRef.nativeElement.children

    //console.log(elementRef.nativeElement.children);

    //console.log(this.route);

    //console.log(routeconfig);


    this.buildTreeview();

  }

  getComponents(compententChildren: any[], index): any[] {

    //compententChildren[index].

    return compententChildren[index].children;
  }


  buildTreeview() {

    let node1: ComponentBrowserModel = new ComponentBrowserModel('component1', 'componentvalue1', []);
    let node2: ComponentBrowserModel = new ComponentBrowserModel('component2', 'componentvalue2', []);
    let node3: ComponentBrowserModel = new ComponentBrowserModel('component3', 'componentvalue3', []);

    let children1: ComponentBrowserModel[] = new Array();
    children1.push(node1);
    children1.push(node2);
    children1.push(node3);

    let node4: ComponentBrowserModel = new ComponentBrowserModel('component4', 'componentvalue4', []);
    let node5: ComponentBrowserModel = new ComponentBrowserModel('component5', 'componentvalue5', []);
    let node6: ComponentBrowserModel = new ComponentBrowserModel('component6', 'componentvalue6', []);

    let children2: ComponentBrowserModel[] = new Array();
    children2.push(node4);
    children2.push(node5);
    children2.push(node6);

    let node7: ComponentBrowserModel = new ComponentBrowserModel('component7', 'componentvalue7', children1);
    let node8: ComponentBrowserModel = new ComponentBrowserModel('component8', 'componentvalue8', children2);

    let children3: ComponentBrowserModel[] = new Array();
    children3.push(node7);
    children3.push(node8);

    let nodeRoot: ComponentBrowserModel = new ComponentBrowserModel('component1', 'componentvalue1', children3);

    console.log(nodeRoot);

    this.tree = nodeRoot;
  }


  ngOnInit() {


  }

}
