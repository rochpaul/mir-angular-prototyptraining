import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrmessagesService} from "../../../services/mcrmessages/mcrmessages.service";
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';

@Component({
  selector: 'app-mcrmessages-manager',
  templateUrl: './mcrmessages-manager.component.html',
  styleUrls: ['./mcrmessages-manager.component.css']
})
export class MCRMessagesManagerComponent implements OnInit {

  mcrMessagesForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private logger: NGXLogger,
              private mcrmessagesService: McrmessagesService) {


    this.mcrmessagesService.getMessagesFromComponent().subscribe(mcrmessageKeys => {

      const control = <FormArray>this.mcrMessagesForm.controls['mcrmmessageItems'];

      for (let mcrmessageKey of mcrmessageKeys) {

        translateService.get('messages.' + mcrmessageKey).subscribe(
          mcrMessageValue => {

            control.push(this.patchValues(mcrmessageKey, mcrMessageValue));

            logger.debug("MCRMessagesManager:: " + mcrmessageKey + ": " + mcrMessageValue);
          }
        )
      }


    });
  }

  ngOnInit() {
    this.mcrMessagesForm =

      this.formBuilder.group({
        mcrmmessageItems: this.formBuilder.array([]) // create empty form array
      });
  }

  // assign the values
  patchValues(mcrMessageKey, mcrMessageValue) {
    return this.formBuilder.group({
      mcrMessageKey: [mcrMessageKey],
      mcrMessageValue: [mcrMessageValue]
    })
  }
}
