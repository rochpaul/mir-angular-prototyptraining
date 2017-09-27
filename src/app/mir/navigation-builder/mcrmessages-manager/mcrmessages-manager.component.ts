import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrmessagesService} from "../../../services/mcrmessages/mcrmessages.service";
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {McrMessagesModel} from "../../../services/mcrmessages/mcrmessages.model";
import {MdDialog, MdDialogRef} from "@angular/material";
import {SimpleConfirmComponent} from "../../dialogs/simple-confirm/simple-confirm.component";

@Component({
  selector: 'app-mcrmessages-manager',
  templateUrl: './mcrmessages-manager.component.html',
  styleUrls: ['./mcrmessages-manager.component.css']
})
export class MCRMessagesManagerComponent implements OnInit {

  mcrmessagesForm: FormGroup;
  mcrMessagesFormArray: FormArray;

  mcrmessages: McrMessagesModel[];
  messagesMofified: boolean;
  dialogRef: MdDialogRef<SimpleConfirmComponent>;


  constructor(private formBuilder: FormBuilder,
              public dialog: MdDialog,
              private logger: NGXLogger,
              private mcrmessagesService: McrmessagesService) {

    mcrmessagesService.getMCRMessagesFromComponent().subscribe(mcrmessages => {

        /*
         * check subscribed messages against messages in form array
         */
        this.mcrmessages = mcrmessages;


        // get form array
        this.mcrMessagesFormArray = <FormArray>this.mcrmessagesForm.controls['mcrMessages'];

        if (this.mcrMessagesFormArray.length !== 0) {

          this.checkModifications();
        } else {

          for (let mcrmessage of mcrmessages) {

            logger.debug("MCRMessagesManager:: " + mcrmessage.messagekey + ": " + mcrmessage.messagevalue);

            this.mcrMessagesFormArray.push(this.createitems(mcrmessage));
          }
        }
      }
    )

    mcrmessagesService.getMCRLanguageChangeSubject().subscribe(
      mcrLanguage => {

        /*
         * inform user about possible data loss
         */
        logger.debug("MCRMessagesManager: Inform user about possible data loss");

      });

  }

  checkModifications() {

    this.logger.debug("MCRMessagesManager: Check for modifications in mcr messages");

    for (let mcrMessageFormControl of this.mcrMessagesFormArray.controls) {

      if (mcrMessageFormControl.value.changedValue) {

        /*
         * There have been changes -> marc formpart and inform user
         */

        console.log(mcrMessageFormControl.value.changedValue);

        this.dialogRef = this.dialog.open(SimpleConfirmComponent, {
          disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

        this.dialogRef.afterClosed().subscribe(result => {
          if(result) {
            // do confirmation actions
          }
          this.dialogRef = null;
        });

      }
    }





    // let missing = this.mcrmessagesForm.value.mcrMessages
    //   .filter(item =>
    // this.mcrmessages.filter(item => this.mcrmessages.indexOf(item) < 0));
    //
    // console.log(missing);
  }


  ngOnInit() {

    // initialize form
    this.mcrmessagesForm = new FormGroup({
      mcrMessages: new FormArray([])
    });
  }

  createitems(mcrmessage?: McrMessagesModel) {
    return this.formBuilder.group({
      mcrmessage: [mcrmessage],
      changedValue: ''
    });
  }

  saveMcrMessages() {

    /*
     * get value change information from form array controls -> changedValue
     */
    console.log(this.mcrMessagesFormArray);


  }
}
