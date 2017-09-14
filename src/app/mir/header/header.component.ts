import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NGXLogger} from 'ngx-logger';
import {MCRLanguageService} from "../../i18n/mcrlanguage.service";

@Component({
  selector: '[mir-header]',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  mcrlanguages: string[];
  settedLanguage: string;

  constructor(private translate: TranslateService,
              private mcrLanguageService: MCRLanguageService,
              private logger: NGXLogger) {

  }

  switchLanguage(language: string) {

    this.logger.info('HeaderComponent.switchLanguage: Switch language to ' + language);

    /*
     * add filtered language to visible languages again!
     */
    this.mcrlanguages.push(this.settedLanguage);

    /*
     * modify setted language
     */
    this.settedLanguage = language;

    this.logger.info(this.mcrlanguages);

    this.translate.use(language);
  }

  ngOnInit() {

    this.getAvailableLanguages();
  }

  getAvailableLanguages() {

    this.mcrLanguageService.getAvailableLanguages().subscribe(
      mcrlanguage => {

        this.logger.info('HeaderComponent.getAvailableLanguages(): ' + mcrlanguage.availablelang);

        this.mcrlanguages = mcrlanguage.availablelang;

        /*
         * handling standard language
         */
        let browserlang = this.translate.getBrowserLang();

        this.logger.info('HeaderComponent.getAvailableLanguages(): Set MCR Standard language');

        if (mcrlanguage.availablelang.indexOf(browserlang) !== -1) {

          this.settedLanguage = browserlang;

          this.logger.info('HeaderComponent.getAvailableLanguages(): Default browser language was detected under available languages');
          this.logger.info('HeaderComponent.getAvailableLanguages(): Set MCR Standard language to: ' + this.settedLanguage);

        } else {

          this.settedLanguage = this.mcrlanguages[0];

          this.logger.warn('HeaderComponent.getAvailableLanguages(): Default browser language "' + browserlang + '" is not defined in MCR languages. Set ' +
            'first available mcr language as standard: ' + this.settedLanguage);
        }

        this.translate.setDefaultLang(this.settedLanguage);

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
