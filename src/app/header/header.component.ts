import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MCRLanguageService} from "../i18n/mcrlanguage.service";
import {IMCRLanguage} from "../i18n/mcrlanguage";
import {HttpErrorResponse} from "@angular/common/http";
import { NGXLogger } from 'ngx-logger';

// import { NavigationComponent }  from './navigation/navigation.component';

@Component({
  selector: '[mir-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mcrlanguages: string[];
  defaultLanguage: string;

  constructor(private translate: TranslateService,
              private mcrLanguageService: MCRLanguageService,
              private logger: NGXLogger) {

    // this language will be used as a fallback when a translation isn't found in the current language


    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // /*
    //  * prototype
    //  */
    // translate.addLangs(["de", "en"]);
    // translate.setDefaultLang("de");
    //
    // /*
    //  * get the current browser language
    //  */
    // let browserlang = translate.getBrowserLang();
    //
    // //translate.use(browserlang.match("/de|en") ? browserLang : "de");
    //
    // translate.use("de");
  }

  switchLanguage(language: string) {

    this.logger.info('HeaderComponent.switchLanguage: Switch language to ' + language);

    this.defaultLanguage = language;

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

          this.defaultLanguage = browserlang;

          this.logger.info('HeaderComponent.getAvailableLanguages(): Default browser language was detected under available languages');
          this.logger.info('HeaderComponent.getAvailableLanguages(): Set MCR Standard language to: ' + this.defaultLanguage);

        } else {

          this.defaultLanguage = this.mcrlanguages[0];

          this.logger.warn('HeaderComponent.getAvailableLanguages(): Default browser language "' + browserlang + '" is not defined in MCR languages. Set ' +
            'first available mcr language as standard: '+ this.defaultLanguage);
        }

        this.translate.setDefaultLang(this.defaultLanguage);

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
