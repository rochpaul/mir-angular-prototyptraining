import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

// import { NavigationComponent }  from './navigation/navigation.component';

@Component({
  selector: '[mir-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
