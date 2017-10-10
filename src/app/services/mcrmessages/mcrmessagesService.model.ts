import {McrMessagesModel} from "./mcrmessages.model";
import {Component} from "@angular/core";


/**
 * represents a model for mcrmessages service with mcrmessages key value store and component/language information
 */
export class McrMessagesServiceModel {

  mcrmessages: McrMessagesModel[];
  mcrmessagesMaintain: McrMessagesModel[];

  language: string;

  mcrMaintainLanguage: string;

  associatedComponent: Component;

  constructor(mcrmessages, language, mcrMaintainLanguage, associatedComponent?) {

    this.mcrmessages = mcrmessages;
    this.language = language;
    this.associatedComponent = associatedComponent;
    this.mcrMaintainLanguage = mcrMaintainLanguage;
  }

}
