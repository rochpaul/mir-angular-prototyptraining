import {Injectable, Component, Type} from '@angular/core';
import {ComponentRegistryModel} from "./component-registry-model";

@Injectable()
export class ComponentRegistryService {

  componentsAsModel: ComponentRegistryModel[] = [];

  constructor() {
  }

  init(components: Type<any>[]) {

    console.log("ComponentRegistryService: Start to register components");

    for (let component of components) {

      this.componentsAsModel.push(new ComponentRegistryModel(component.name, component.name, component));
    }
  }

  getAllComponents(): ComponentRegistryModel[] {

    return this.componentsAsModel;
  }

  getComponentModelById(id: String): ComponentRegistryModel {

    return this.componentsAsModel.find(component => component.id === id);
  }

}
