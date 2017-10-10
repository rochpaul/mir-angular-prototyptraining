import {McrMessagesModel} from "./mcrmessages.model";
import {Component} from "@angular/core";


/**
 * represents a model for mcrmessages service with mcrmessages key value store and component/language information
 */
export class McrMessagesServiceModel {

  mcrmessages: McrMessagesModel[];
  language: string;
  mcrMaintainLanguage: string;
  mcrMaintainMessages: McrMessagesModel[];
  associatedComponent: Component;

  constructor(language, mcrMaintainLanguage, mcrMaintainMessages, mcrmessages, associatedComponent?) {


    this.language = language;
    this.mcrMaintainLanguage = mcrMaintainLanguage;

    this.mcrmessages = mcrmessages;
    this.mcrMaintainMessages = mcrMaintainMessages;
    this.associatedComponent = associatedComponent;
  }

}
