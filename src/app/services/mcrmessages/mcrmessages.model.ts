export class McrMessagesModel {

  messagekey: string;
  messagevalue: string;
  language: string;
  injectedInComponent: string;

  constructor(messagekey, messagevalue, language, injectedInComponent: string = '') {
    this.messagekey = messagekey;
    this.messagevalue = messagevalue;
    this.language = language;

    this.injectedInComponent = injectedInComponent;
  }
}
