export class McrMessagesServerModel {

  language: string;
  mcrmessages: Array<string>;

  constructor(mcrmessages, language) {

    this.mcrmessages = mcrmessages;
    this.language = language;
  }

}
