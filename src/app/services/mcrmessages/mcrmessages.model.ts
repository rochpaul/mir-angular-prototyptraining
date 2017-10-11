/*
 * represents value key connection for mcr messages
 */
export class McrMessagesModel {

  messagekey: string;
  messagevalue: string;

  isNoTranslation: boolean;
  isOnlyDefaultTranslation: boolean;


  constructor(messagekey, messagevalue, isNoTranslation, isOnlyDefaultTranslation) {
    this.messagekey = messagekey;
    this.messagevalue = messagevalue;

    this.isNoTranslation = isNoTranslation;
    this.isOnlyDefaultTranslation = isOnlyDefaultTranslation;
  }
}
