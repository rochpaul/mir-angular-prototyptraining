import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrmessagesService} from "../../../services/mcrmessages/mcrmessages.service";
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {McrMessagesModel} from "../../../services/mcrmessages/mcrmessages.model";

@Component({
  selector: 'app-mcrmessages-manager',
  templateUrl: './mcrmessages-manager.component.html',
  styleUrls: ['./mcrmessages-manager.component.css']
})
export class MCRMessagesManagerComponent implements OnInit {

  mcrmessagesForm: FormGroup;
  mcrmessages: McrMessagesModel[];
  messagesMofified: boolean;


  constructor(private formBuilder: FormBuilder,
              private logger: NGXLogger,
              private mcrmessagesService: McrmessagesService) {

    mcrmessagesService.getMCRMessagesFromComponent().subscribe(mcrmessages => {

        /*
         * check subscribed messages against messages in form array
         */
        this.mcrmessages = mcrmessages;


        // get form array
        const mcrMessagesFormArray = <FormArray>this.mcrmessagesForm.controls['mcrMessages'];

        if (mcrMessagesFormArray.length !== 0) {

          this.checkModifications();
        } else {

          for (let mcrmessage of mcrmessages) {

            logger.debug("MCRMessagesManager:: " + mcrmessage.messagekey + ": " + mcrmessage.messagevalue);

            mcrMessagesFormArray.push(this.createitems(mcrmessage));
          }
        }
      }
    )
  }

  checkModifications() {

    this.logger.debug("MCRMessagesManager: Check for modifications in mcr messages");

    console.log(this.mcrmessagesForm.value);

    // let missing = this.mcrmessagesForm.value.mcrMessages
    //   .filter(item =>
    // this.mcrmessages.filter(item => this.mcrmessages.indexOf(item) < 0));
    //
    // console.log(missing);
  }

  changeMcrmessageInForm(event) {

    console.log(event);
  }

  ngOnInit() {

    // initialize form
    this.mcrmessagesForm = new FormGroup({
      mcrMessages: new FormArray([])
    });
  }

  createitems(mcrmessage?: McrMessagesModel) {
    return this.formBuilder.group({
      mcrmessage: [mcrmessage]
    });
  }
}
