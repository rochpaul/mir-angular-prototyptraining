import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {LoggerModule} from 'ngx-logger';

import {MCRLanguageService} from './i18n/mcrlanguage.service'

import {AppComponent} from './app.component';
import {StartComponent} from './start/start.component';
import {RegisterlocalComponent} from './loginarea/registerlocal/registerlocal.component';
import {MCRMessagesLoader} from "./i18n/mcrmessages-loader";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {NavigationComponent} from "./header/navigation/navigation.component";

import {BsDropdownModule} from 'ngx-bootstrap';
import {ElementremovePipe} from './pipes/elementremove.pipe';
import {LoginareaComponent} from './loginarea/loginarea.component';
import { ServererrorComponent } from './error/servererror/servererror.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementremovePipe,
    HeaderComponent,
    NavigationComponent,
    StartComponent,
    FooterComponent,
    RegisterlocalComponent,
    LoginareaComponent,
    ServererrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    //LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: 'DEBUG'}),
    LoggerModule.forRoot({level: 'INFO'}),

    RouterModule.forRoot([

      {path: '', component: StartComponent},
      {path: 'mir', component: StartComponent},

      {path: 'loginarea', component: LoginareaComponent},
      {path: 'loginarea/new-author', component: RegisterlocalComponent}

    ]),

    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useClass: MCRMessagesLoader
      }
    })

  ],
  providers: [MCRLanguageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
