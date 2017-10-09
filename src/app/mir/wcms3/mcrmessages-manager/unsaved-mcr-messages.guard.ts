import {Injectable, Type} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MCRMessagesManagerComponent} from "./mcrmessages-manager.component";
import {Wcms3mainComponent} from "../wcms3main/wcms3main.component";
import {ComponentBrowserComponent} from "../component-browser/component-browser.component";

@Injectable()
export class UnsavedMcrMessagesGuard implements CanDeactivate<ComponentBrowserComponent> {

  canDeactivate(component: ComponentBrowserComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot) {

    let canLeave: boolean = false;


    console.log(currentRoute);
    //console.log(currentState);
    //console.log(component);
    //console.log(nextState);

    if (!component.mcrMessagesManager.canDeactivateValue) {
      return component.mcrMessagesManager.canDeactivate(nextState);
    }

    component.mcrMessagesManager.canDeactivateValue = false;
    return true;
  }
}
