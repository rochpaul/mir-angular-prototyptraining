import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrmessagesService} from "../../../services/mcrmessages/mcrmessages.service";
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';

export class McrMessagesModel {

  messagekey: string;
  messagevalue: string;

  constructor(messagekey, messagevalue) {
    this.messagekey = messagekey;
    this.messagevalue = messagevalue;
  }
}

@Component({
  selector: 'app-mcrmessages-manager',
  templateUrl: './mcrmessages-manager.component.html',
  styleUrls: ['./mcrmessages-manager.component.css']
})
export class MCRMessagesManagerComponent implements OnInit {

  mcrmessagesForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private logger: NGXLogger,
              private mcrmessagesService: McrmessagesService) {

  }

  ngOnInit() {

    // initialize form
    this.mcrmessagesForm = new FormGroup({
      mcrMessages: new FormArray([])
    });


    this.mcrmessagesService.getMessagesFromComponent().subscribe(mcrmessageKeys => {

      // get form array
      const mcrMessages = <FormArray>this.mcrmessagesForm.controls['mcrMessages'];

      for (let mcrmessageKey of mcrmessageKeys) {

        this.translateService.get('messages.' + mcrmessageKey).subscribe(
          mcrMessageValue => {

            this.logger.debug("MCRMessagesManager:: " + mcrmessageKey + ": " + mcrMessageValue);

            mcrMessages.push(this.createitems(new McrMessagesModel(mcrmessageKey, mcrMessageValue)));
          }
        )
      }
    });
  }

  createitems(mcrmessage?: McrMessagesModel) {
    return this.formBuilder.group({
      mcrmessage: [mcrmessage]
    });
  }
}
