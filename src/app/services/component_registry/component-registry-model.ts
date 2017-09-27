import {Component} from "@angular/core";
export class ComponentRegistryModel {

  //parent: string;
  id: string;
  value: string;
  component: Component;
  //parentcomponent: Component;

  constructor(id, value, component) {

    this.id = id;
    this.value = value;
    this.component = component;
  }
}
