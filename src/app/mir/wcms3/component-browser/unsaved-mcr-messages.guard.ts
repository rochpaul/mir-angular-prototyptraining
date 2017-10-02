import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {MCRMessagesManagerComponent} from "../mcrmessages-manager/mcrmessages-manager.component";

@Injectable()
export class UnsavedMcrMessagesGuard implements CanDeactivate<MCRMessagesManagerComponent> {

  canDeactivate(component: MCRMessagesManagerComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot){

    let canLeave: boolean = false;

    console.log(component);

    // If the user wants to go to home component
    //if (nextState.url === '/') {
    //  canLeave = window.confirm("You have unsaved changes. Still want to go home?");
    //}
    return canLeave;
  }
}
