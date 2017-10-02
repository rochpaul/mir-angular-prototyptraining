import {Injectable, Type} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {MCRMessagesManagerComponent} from "./mcrmessages-manager.component";
import {Wcms3mainComponent} from "../wcms3main/wcms3main.component";

@Injectable()
export class UnsavedMcrMessagesGuard implements CanDeactivate<Wcms3mainComponent> {

  canDeactivate(component: Wcms3mainComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot){

    let canLeave: boolean = false;

    return component.componentBrowser.mcrMessagesManager.canDeactivate();
  }
}
