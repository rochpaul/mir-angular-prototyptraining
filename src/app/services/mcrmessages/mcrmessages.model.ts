/*
 * represents value key connection for mcr messages
 */
export class McrMessagesModel {

  messagekey: string;
  messagevalue: string;
  isOnlyDefaultTranslation: boolean;

  constructor(messagekey, messagevalue, isOnlyDefaultTranslation = false) {
    this.messagekey = messagekey;
    this.messagevalue = messagevalue;
    this.isOnlyDefaultTranslation = isOnlyDefaultTranslation;
  }
}
