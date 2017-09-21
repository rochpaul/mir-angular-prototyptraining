import { Component, OnInit } from '@angular/core';
import {MarkNavigationElementsService} from "../../services/navigation/mark-navigation-elements.service";

@Component({
  selector: '[mir-footer]',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {

  isMarkComponent = false;

  constructor(private markElementsService: MarkNavigationElementsService) {

    this.markElementsService.getMessage().subscribe(message =>
    {

      this.isMarkComponent = true;

  //     import {
  //       Component, OnChanges, Input,
  //       trigger, state, animate, transition, style
  //     } from '@angular/core';
  //
  //     @Component({
  //       selector : 'my-fader',
  //       template: `
  //   <div [@visibilityChanged]="visibility" >
  //     <ng-content></ng-content>
  //     <p>Can you see me? I should fade in or out...</p>
  //   </div>
  // `,
  //       animations: [
  //         trigger('visibilityChanged', [
  //           state('shown' , style({ opacity: 1 })),
  //           state('hidden', style({ opacity: 0 })),
  //           transition('* => *', animate('.5s'))
  //         ])
  //       ]
  //     })
  //     export class FaderComponent implements OnChanges {
  //       @Input() isVisible : boolean = true;
  //       visibility = 'shown';
  //
  //       ngOnChanges() {
  //         this.visibility = this.isVisible ? 'shown' : 'hidden';
  //       }
  //     }


      console.log(message);
    });
  }

  ngOnInit() {
  }

}
