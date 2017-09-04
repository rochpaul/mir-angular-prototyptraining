import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler} from 'ng2-translate';
import {AppComponent} from './app.component';
import {RegisterlocalComponent} from './registerlocal/registerlocal.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterlocalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    RouterModule.forRoot([

      {path: 'new-author', component: RegisterlocalComponent},
      {path: '', redirectTo: 'new-author', pathMatch: 'full'},
      {path: '**', redirectTo: 'new-author', pathMatch: 'full'}
    ]),

    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
