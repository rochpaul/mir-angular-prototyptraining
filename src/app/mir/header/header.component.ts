import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NGXLogger} from 'ngx-logger';
import {Router} from "@angular/router";
import {McrmessagesService} from "../../services/mcrmessages/mcrmessages.service";
import {IMCRLanguageParams} from "../../services/mcrmessages/mcrlanguage.model";

@Component({
  selector: '[mir-header]',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  mcrlanguageParams: IMCRLanguageParams;
  settedLanguage: string;

  constructor(private translate: TranslateService,
              private mcrmessagesService: McrmessagesService,
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

        this.logger.info('HeaderComponent.getAvailableLanguages(): ' + mcrlanguageParams.availablelang);

        this.mcrlanguageParams = mcrlanguageParams;

        /*
         * handling standard language
         */
        let browserlang = this.translate.getBrowserLang();

        this.logger.info('HeaderComponent.getAvailableLanguages(): Set MCR Standard language');

        if (mcrlanguageParams.availablelang.indexOf(browserlang) !== -1) {

          this.settedLanguage = browserlang;

          this.logger.info('HeaderComponent.getAvailableLanguages(): Default browser language was detected under available languages');
          this.logger.info('HeaderComponent.getAvailableLanguages(): Set MCR Standard language to: ' + this.settedLanguage);

        } else {

          this.settedLanguage = this.mcrlanguageParams.availablelang[0];

          this.logger.warn('HeaderComponent.getAvailableLanguages(): Default browser language "' + browserlang + '" is not defined in MCR languages. Set ' +
            'first available mcr language as standard: ' + this.settedLanguage);
        }

        this.translate.setDefaultLang(this.settedLanguage);

        /*
         * Handling mcr maintain language (language with most translation maintenance)
         */
        //this.mcrlanguageParams.currentLang = this.settedLanguage;

        //this.mcrmessagesService.sendMCRLanguageParamsSubject(this.mcrlanguageParams);


      },
      (err: HttpErrorResponse) => {

        if (err.error instanceof Error) {

          console.log("MCRLanguageService.getAvailableLanguages(): Client-side Error occured");
        } else {
          console.log("MCRLanguageService.getAvailableLanguages(): Server-side Error occured");
        }
      });
  }
}
