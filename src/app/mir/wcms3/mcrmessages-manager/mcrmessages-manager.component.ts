import {Component, OnInit, Type, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {McrmessagesService} from "../../../services/mcrmessages/mcrmessages.service";
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {McrMessagesModel} from "../../../services/mcrmessages/mcrmessages.model";
import {MdDialog, MdDialogRef} from "@angular/material";
import {SimpleConfirmComponent} from "../../dialogs/simple-confirm/simple-confirm.component";
import {McrMessagesServiceModel} from "../../../services/mcrmessages/mcrmessagesService.model";
import {Router, NavigationStart, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-mcrmessages-manager',
  templateUrl: 'mcrmessages-manager.component.html',
  styleUrls: ['mcrmessages-manager.component.css']
})
export class MCRMessagesManagerComponent implements OnInit {

  mcrmessagesForm: FormGroup;
  mcrMessagesFormArray: FormArray;

  mcrMessagesServiceModel: McrMessagesServiceModel;
  dialogRef: MdDialogRef<SimpleConfirmComponent>;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public dialog: MdDialog,
              private logger: NGXLogger,
              private mcrmessagesService: McrmessagesService) {

    /*
     * mcr message manager subscribe three different changes
     *
     * -> changes from route (via guard)
     * -> changes from language switcher
     * -> changes from component browser
     */


    mcrmessagesService.getMCRMessageModelFromComponent().subscribe(mcrMessageServiceModel => {

        /*
         * check subscribed messages against messages in form array
         */
        this.mcrMessagesServiceModel = mcrMessageServiceModel;

        /*
         * get current form array from form
         */
        //this.mcrMessagesFormArray = <FormArray>this.mcrmessagesForm.controls['mcrMessages'];

        /*
         * check for modifications
         */
        //if (this.mcrMessagesFormArray.length !== 0) {

        //this.logger.info("MCRMessagesManagerComponent:  " + isModificated);
        //}
        var isModificated = this.isModificated();

        /*
         * There are no modifications - Update values
         */

        if (!isModificated) {

          this.logger.info("MCRMessagesManagerComponent: getMCRMessageModelFromComponent() - Update values");

          /*
           * push sended messages to form
           */
          this.mcrmessagesForm.controls['mcrMessages'] = new FormArray([]);
          this.mcrMessagesFormArray = <FormArray>this.mcrmessagesForm.controls['mcrMessages'];


          for (let mcrmessage of this.mcrMessagesServiceModel.mcrmessages) {

            logger.debug("MCRMessagesManagerComponent: Push Message to FormArray"
              + mcrmessage.messagekey + ": " + mcrmessage.messagevalue);

            this.mcrMessagesFormArray.push(this.createitems(mcrmessage));
          }
        } else {

          this.logger.info("MCRMessagesManagerComponent: getMCRMessageModelFromComponent() - Data loss warning");

        }
      }
    )

    mcrmessagesService.getMCRLanguageChangeSubject().subscribe(
      mcrLanguage => {

        /*
         * inform user about possible data loss
         */
        this.mcrmessagesService.sendServiceModelFromComponent(<Type<any>> this.mcrMessagesServiceModel.associatedComponent);

      });
  }

  isModificated(): boolean {

    this.logger.info("MCRMessagesManagerComponent: isModificated() - Check for modifications in mcr messages");

    let isModificated = false;

    if (this.mcrMessagesFormArray && this.mcrMessagesFormArray.length !== 0) {

      for (let mcrMessageFormControl of this.mcrMessagesFormArray.controls) {

        if (mcrMessageFormControl.value.changedValue) {

          /*
           * There have been changes -> marc fields and inform user
           */
          this.logger.info("MCRMessagesManagerComponent: isModificated() - Changes at "
            + mcrMessageFormControl.value.mcrmessage.messagevalue + " - "
            + mcrMessageFormControl.value.changedValue);

          console.log(mcrMessageFormControl.value.changedValue);

          isModificated = true;
        }
      }
    }
    return isModificated;
  }

  // checkModifications() {
  //
  //
  //   }
  //
  //   if (isDialogNecessary) {
  //
  //     this.dialogRef = this.dialog.open(SimpleConfirmComponent, {
  //       disableClose: false
  //     });
  //     this.dialogRef.componentInstance.confirmMessage = "Sollen die aktuellen Änderungen gespeichert werden ?"
  //
  //     this.dialogRef.afterClosed().subscribe(result => {
  //       if (result) {
  //         // do confirmation actions
  //       }
  //       this.dialogRef = null;
  //     });
  //   }
  // }


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

  canDeactivate() {

    this.logger.info("MCRMessagesManagerComponent: canDeactivate() - Looking for permission to change route");

    var isModificated = this.isModificated();
    this.logger.info("MCRMessagesManagerComponent: canDeactivate() - " + isModificated);

    return isModificated;
  }

}
