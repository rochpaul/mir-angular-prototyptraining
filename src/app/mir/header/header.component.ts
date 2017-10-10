import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {McrmessagesService} from "../../services/mcrmessages/mcrmessages.service";
import {IMCRLanguageParams} from "../../services/mcrmessages/mcrlanguage.params.model";

@Component({
  selector: '[mir-header]',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  mcrlanguageParams: IMCRLanguageParams;
  settedLanguage: string;

  constructor(private mcrmessagesService: McrmessagesService,
              private logger: NGXLogger) {

  }

  switchLanguage(language: string) {

    this.logger.info('HeaderComponent.switchLanguage: Switch language to ' + language);

    /*
     * add filtered language to visible languages again!
     */
    this.mcrlanguageParams.availablelang.push(this.settedLanguage);

    /*
     * modify setted language
     */
    this.settedLanguage = language;

    this.mcrlanguageParams.currentLang = this.settedLanguage;

    this.mcrmessagesService.switchLanguage(this.mcrlanguageParams);
  }

  ngOnInit() {

    this.getAvailableLanguages();
  }

  getAvailableLanguages() {

    this.mcrmessagesService.getAvailableLanguages().subscribe(
      mcrlanguageParams => {

        this.logger.info('HeaderComponent.getAvailableLanguages(): Set available lang binding ' + mcrlanguageParams.availablelang);
        this.logger.info('HeaderComponent.getAvailableLanguages(): Set default lang binding ' + mcrlanguageParams.currentLang);

        this.mcrlanguageParams = mcrlanguageParams;
        this.settedLanguage = mcrlanguageParams.currentLang;

      });
  }
}
