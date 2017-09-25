import {Component, OnInit, Input} from '@angular/core';
import  {trigger, state, transition, style, animate} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';


import {MarkNavigationElementsService} from "../../services/navigation/mark-navigation-elements.service";
import {getAnnotation} from "../../../annotation";
import {RegisterlocalComponent} from "../loginarea/registerlocal/registerlocal.component";

@Component({
  selector: '[mir-footer]',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'],
  animations: [
    trigger('markState', [
      state('stateIn', style({

        border: "5px dotted #3a7999",
        //color: "#3a7999",
        background: "rgba(0,0,0,0)",
      })),
      state('stateOut', style({})),
      transition('* <=> *', animate('450ms ease-in')),
    ])
  ]
})
export class FooterComponent implements OnInit {

  markState = 'stateOut';
  navigationId = '123';

  onDone($event) {

    console.log("done");

    // if (this.markState === 'stateIn') {
    //   this.markState = 'stateOut';
    // }
  }

  constructor(private markElementsService: MarkNavigationElementsService) {

    this.markElementsService.getNavigationId().subscribe(message => {

      console.log(this.navigationId);
      this.navigationId = message.text;
      console.log(this.navigationId);

      this.markState = 'stateIn';

      markElementsService.sendMessagesFromComponent(RegisterlocalComponent);

      //
      //     @Component({
      //       selector : 'my-fader',
      //       template: `
      //   <div [@visibilityChanged]="visibility" >
      //     <ng-content></ng-content>
      //     <p>Can you see me? I should fade in or out...</p>
      //   </div>
      // `,

      //     export class FaderComponent implements OnChanges {
      //       @Input() isVisible : boolean = true;
      //       visibility = 'shown';
      //
      //       ngOnChanges() {
      //         this.visibility = this.isVisible ? 'shown' : 'hidden';
      //       }
      //     }


      //console.log(message);
    });
  }

  ngOnInit() {
  }
}
