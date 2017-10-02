import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Component, APP_INITIALIZER} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {LoggerModule} from 'ngx-logger';
import {TreeModule} from 'ng2-tree';
import {CKEditorModule} from 'ng2-ckeditor';

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
import {MarkNavigationElementsService} from "./services/navigation/mark-navigation-elements.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {McrmessagesService} from "./services/mcrmessages/mcrmessages.service";
import {MCRMessagesManagerComponent} from './mir/wcms3/mcrmessages-manager/mcrmessages-manager.component';
import {ComponentBrowserComponent} from './mir/wcms3/component-browser/component-browser.component';
import {SimpleConfirmComponent} from './mir/dialogs/simple-confirm/simple-confirm.component';
import {MdDialogModule} from "@angular/material";
import {Wcms3mainComponent} from './mir/wcms3/wcms3main/wcms3main.component';
import {ComponentRegistryService} from "./services/component_registry/component-registry.service";
import {UnsavedMcrMessagesGuard} from "./mir/wcms3/component-browser/unsaved-mcr-messages.guard";

export function registerComponentsFactory(componentRegistry: ComponentRegistryService): Function {
  return () => componentRegistry.init(
    [AppComponent,
      MirComponent,
      ServererrorComponent,
      HeaderComponent,
      NavigationComponent,
      StartComponent,
      FooterComponent,
      RegisterlocalComponent,
      LoginareaComponent
    ]
  );
}

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
    MCRMessagesManagerComponent,
    ComponentBrowserComponent,
    SimpleConfirmComponent,
    Wcms3mainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreeModule,
    CKEditorModule,

    //LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: 'DEBUG'}),
    LoggerModule.forRoot({level: 'DEBUG'}),

    RouterModule.forRoot([


      {path: '', redirectTo: 'mir', pathMatch: 'full'},

      {
        path: 'mir', component: MirComponent,
        children: [
          {path: '', component: StartComponent},
          {path: 'loginarea', component: LoginareaComponent},
          {path: 'loginarea/new-author', component: RegisterlocalComponent},
          {path: 'navigationbuilder', component: NavigationBuilderComponent},
          {path: 'wcms', component: Wcms3mainComponent, canDeactivate: [UnsavedMcrMessagesGuard]}
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
  providers: [

    UnsavedMcrMessagesGuard,
    ComponentRegistryService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: registerComponentsFactory,
      deps: [ComponentRegistryService],
      multi: true
    },
    MarkNavigationElementsService,
    MCRServerStatusService,
    AuthenticationService,
    McrmessagesService],
  bootstrap: [AppComponent],
  entryComponents: [SimpleConfirmComponent]
})
export class AppModule {

}
