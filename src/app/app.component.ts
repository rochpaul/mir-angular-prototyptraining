import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {

    /*
     * prototype
     */
    translate.addLangs(["de", "en"]);
    translate.setDefaultLang("de");

    /*
     * get the current browser language
     */
    let browserlang = translate.getBrowserLang();

    //translate.use(browserlang.match("/de|en") ? browserLang : "de");

    translate.use("de");
  }

  ngOnInit() {

  }
}
