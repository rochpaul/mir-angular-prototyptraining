import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {RegisterlocalComponent} from './registerlocal/registerlocal.component';
import {MCRMessagesLoader} from "./i18n/mcrmessages-loader";

@NgModule({
  declarations: [
    AppComponent,
    RegisterlocalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule.forRoot([

      {path: 'new-author', component: RegisterlocalComponent},
      {path: '', redirectTo: 'new-author', pathMatch: 'full'},
      {path: '**', redirectTo: 'new-author', pathMatch: 'full'}
    ]),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useClass: MCRMessagesLoader}
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
