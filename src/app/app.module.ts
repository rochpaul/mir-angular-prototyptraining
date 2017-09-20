import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {LoggerModule} from 'ngx-logger';
import {TreeModule} from 'ng2-tree';
import { CKEditorModule } from 'ng2-ckeditor';

import {MCRLanguageService} from './i18n/mcrlanguage.service'
import {AuthenticationService} from "./services/authentication/authentication.service";

import {AppComponent} from './app.component';
import {StartComponent} from './mir/start/start.component';
import {RegisterlocalComponent} from './mir/loginarea/registerlocal/registerlocal.component';
import {MCRMessagesLoader} from "./i18n/mcrmessages-loader";
import {FooterComponent} from "./mir/footer/footer.component";
import {HeaderComponent} from "./mir/header/header.component";
import {NavigationComponent} from "./mir/header/navigation/navigation.component";

import {BsDropdownModule} from 'ngx-bootstrap';
import {ElementremovePipe} from './pipes/elementremove.pipe';
import {LoginareaComponent} from './mir/loginarea/loginarea.component';
import {ServererrorComponent} from './error/servererror/servererror.component';
import {MirComponent} from './mir/mir.component';
import {MCRServerStatusService} from "./services/serverstatus/mcrserver-status.service";
import {NavigationBuilderComponent} from './mir/navigation-builder/navigation-builder.component';


@NgModule({
  declarations: [
    ElementremovePipe,
    AppComponent,
    MirComponent,
    ServererrorComponent,
    HeaderComponent,
    NavigationComponent,
    StartComponent,
    FooterComponent,
    RegisterlocalComponent,
    LoginareaComponent,
    NavigationBuilderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreeModule,
    CKEditorModule,

    //LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: 'DEBUG'}),
    LoggerModule.forRoot({level: 'INFO'}),

    RouterModule.forRoot([

      {path: '', redirectTo: 'mir', pathMatch: 'full'},

      {
        path: 'mir', component: MirComponent,
        children: [
          {path: '', component: StartComponent},
          {path: 'loginarea', component: LoginareaComponent},
          {path: 'loginarea/new-author', component: RegisterlocalComponent},
          {path: 'navigationbuilder', component: NavigationBuilderComponent}
        ]

      },
      {path: 'servererror', component: ServererrorComponent}

    ]),

    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useClass: MCRMessagesLoader
      }
    })

  ],
  providers: [MCRLanguageService, MCRServerStatusService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
