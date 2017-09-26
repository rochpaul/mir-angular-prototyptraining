export class McrMessagesModel {

  messagekey: string;
  messagevalue: string;
  injectedInComponent: string;

  constructor(messagekey, messagevalue, injectedInComponent: string = '') {
    this.messagekey = messagekey;
    this.messagevalue = messagevalue;
    this.injectedInComponent = injectedInComponent;
  }
}
