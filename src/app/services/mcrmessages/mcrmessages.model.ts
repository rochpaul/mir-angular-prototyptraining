/*
 * represents value key connection for mcr messages
 */
export class McrMessagesModel {

  messagekey: string;
  messagevalue: string;

  constructor(messagekey, messagevalue) {
    this.messagekey = messagekey;
    this.messagevalue = messagevalue;
  }
}
