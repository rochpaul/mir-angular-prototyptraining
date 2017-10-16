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
import {McrMessagesServerModel} from "../../../services/mcrmessages/mcrmessagesServer.model";

@Component({
  selector: 'app-mcrmessages-manager',
  templateUrl: 'mcrmessages-manager.component.html',
  styleUrls: ['mcrmessages-manager.component.css']
})
export class MCRMessagesManagerComponent implements OnInit {

  // messages manager options
  showMissingTranslations: boolean = false;
  showDefaultTranslations: boolean = false;

  mcrmessagesForm: FormGroup;
  mcrMessagesFormArray: FormArray;

  canDeactivateValue: boolean = false;
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
        let settedLanguage;

        if (this.mcrMessagesServiceModel) {

          settedLanguage = this.mcrMessagesServiceModel.language
        }


        this.mcrMessagesServiceModel = mcrMessageServiceModel;

        /*
         * get current form array from form
         */
        //this.mcrMessagesFormArray = <FormArray>this.mcrmessagesForm.controls['mcrMessages'];

        /*
         * check for modifications
         */
        var isModificated = this.isModificated();

        /*
         * There are no modifications or language have been switched -> Update values
         */
        if (!isModificated || settedLanguage !== this.mcrMessagesServiceModel.language) {

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

    mcrmessagesService.getMCRLanguageParamsSubject().subscribe(
      mcrLanguageParam => {

        if (this.mcrMessagesServiceModel && this.mcrMessagesServiceModel.associatedComponent) {

          /*
           * inform user about possible data loss
           */
          var isModificated = this.isModificated();

          if (isModificated) {

            this.dialogRef = this.dialog.open(SimpleConfirmComponent, {
              disableClose: false
            });
            this.dialogRef.componentInstance.confirmMessage =
              "Beim wechseln der Sprache gehen die aktuellen Änderungen verloren. Wollen Sie fortfahren?";

            this.dialogRef.afterClosed().subscribe(result => {
              if (result) {

                /*
                 * continue
                 */
                this.mcrmessagesService.sendServiceModelFromComponent(<Type<any>> this.mcrMessagesServiceModel.associatedComponent);
              }
              /*
               * don't change language! Send some information to service (Switcher is not synchronized with form model)
               */
            })
          } else {

            this.mcrmessagesService.sendServiceModelFromComponent(<Type<any>> this.mcrMessagesServiceModel.associatedComponent);
          }
        }
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

    let messagesToSave: Array<string> = [];

    this.logger.info("MCRMessagesManagerComponent: saveMcrMessages() - Prepare changed messages to save on serverside");

    this.mcrMessagesFormArray.controls.filter(
      control => {

        if (control.touched) {

          messagesToSave.push(control.value.mcrmessage.messagekey + ":=" + control.value.changedValue)

          this.logger.info("MCRMessagesManagerComponent: saveMcrMessages() - "
            + control.value.mcrmessage.messagekey + ": " + control.value.changedValue);
        }
      });

    if (messagesToSave.length != 0) {

      let mcrMessageSerialize: McrMessagesServerModel = new McrMessagesServerModel(
        messagesToSave, this.mcrMessagesServiceModel.language);

      this.mcrmessagesService.updateMcrMessages(mcrMessageSerialize);
    }
  }

  canDeactivate(nextState?: RouterStateSnapshot) {

    this.logger.info("MCRMessagesManagerComponent: canDeactivate() - Looking for permission to change route");

    var isModificated = this.isModificated();
    this.logger.info("MCRMessagesManagerComponent: canDeactivate() - " + isModificated);

    /*
     * if there are modifications disable routing and change canDeactivateValue to true after Dialog click.
     * This allows routing from guard!
     */
    if (isModificated) {

      this.dialogRef = this.dialog.open(SimpleConfirmComponent, {
        disableClose: false
      });
      this.dialogRef.componentInstance.confirmMessage =
        "Beim verlassen des Message Editors gehen die aktuellen Änderungen verloren.Wollen sie fortfahren? ";

      this.dialogRef.afterClosed().subscribe(result => {
        if (result) {

          /*
           * continue navigation
           */
          this.canDeactivateValue = true;
          this.router.navigateByUrl(nextState.url);

          this.dialogRef = null;
        } else {

          /*
           * user want to edit form without changing view
           */
          this.logger.info("MCRMessagesManagerComponent: canDeactivate() - User want to edit current form");
        }

        /*
         * disable navigation
         */

      });

      return false;
    }
    return true;
  }

  changeShowDefaultTranslations($event) {

    this.showDefaultTranslations = !this.showDefaultTranslations;
  }

  changeShowMissingTranslations($event) {

    this.showMissingTranslations = !this.showMissingTranslations;
  }
}
