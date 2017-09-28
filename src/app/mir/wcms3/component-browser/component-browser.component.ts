import {
  Component, OnInit, ApplicationRef, Injector, ElementRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory, Type
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TreeModel} from "ng2-tree";
import {ComponentRegistryService} from "../../../services/component_registry/component-registry.service";
import {NGXLogger} from "ngx-logger";
import {McrmessagesService} from "../../../services/mcrmessages/mcrmessages.service";
import {FooterComponent} from "../../footer/footer.component";

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

  tree: TreeModel;
  activeComponentId: string;


  constructor(private componentRegistry: ComponentRegistryService,
              private logger: NGXLogger,
              private mcrmessagesService: McrmessagesService) {

    this.buildTreeview();

  }

  buildTreeview() {

    /*
     * map component registry entries as Component Browser model
     */

    var registeredComponents = this.componentRegistry.getAllComponents()
    var componentsBrowserModel: ComponentBrowserModel[] = [];


    registeredComponents.map(component => {
      componentsBrowserModel.push(new ComponentBrowserModel(component.id, component.id, []));
    });

    let nodeRoot: ComponentBrowserModel = new ComponentBrowserModel('componentBrowserRoot', 'Registered Components', componentsBrowserModel);

    this.tree = nodeRoot;
  }

  handleSelectedComponent($event) {

    /*
     * set active component
     */
    if ($event.node.node.id !== this.activeComponentId) {

      /*
       * send active component id
       */
      this.logger.info("ComponentBrowserComponent: Change active Component to " + this.activeComponentId);

      this.activeComponentId = ($event.node.node.id);

      /*
       * get all Messages associate with active component
       */
      this.mcrmessagesService.sendMCRMessagesFromComponent(
        <Type<any>> this.componentRegistry.getComponentModelById(this.activeComponentId).component
      );

    }
  }

  ngOnInit() {

  }


}
