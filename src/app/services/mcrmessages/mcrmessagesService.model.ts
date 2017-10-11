import {McrMessagesModel} from "./mcrmessages.model";
import {Component} from "@angular/core";


/**
 * represents a model for mcrmessages service with mcrmessages key value store and component/language information
 */
export class McrMessagesServiceModel {

  mcrmessages: McrMessagesModel[];
  language: string;
  mcrMaintainLanguage: string;
  
  associatedComponent: Component;

  constructor(language, mcrMaintainLanguage, mcrmessages, associatedComponent?) {


    this.language = language;
    this.mcrMaintainLanguage = mcrMaintainLanguage;

    this.mcrmessages = mcrmessages;
    this.associatedComponent = associatedComponent;
  }

}
