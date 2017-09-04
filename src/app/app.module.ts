import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {TranslateModule} from 'ng2-translate';

import {AppComponent} from './app.component';
import {RegisterlocalComponent} from './registerlocal/registerlocal.component';


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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
