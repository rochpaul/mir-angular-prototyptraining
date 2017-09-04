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

export function HttpLoaderFactory(http: HttpClient) {

  // Make the HTTP request:
  http.get('http://localhost:8080/mir/api/v1/messages?format=json').subscribe(data => {
    // Read the result field from the JSON response.
    console.log('It works here')

    console.log(data);

  });

  return new TranslateHttpLoader(http);
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
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule.forRoot([

      {path: 'new-author', component: RegisterlocalComponent},
      {path: '', redirectTo: 'new-author', pathMatch: 'full'},
      {path: '**', redirectTo: 'new-author', pathMatch: 'full'}
    ]),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
