import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'mir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

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
    this.translate.use(language);
  }

  ngOnInit() {

  }
}
