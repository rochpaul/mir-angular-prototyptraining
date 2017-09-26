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


  constructor(private formBuilder: FormBuilder,
              private logger: NGXLogger,
              private mcrmessagesService: McrmessagesService) {

    mcrmessagesService.getMCRMessagesFromComponent().subscribe(mcrmessages => {

        // get form array
        const mcrMessagesFormArray = <FormArray>this.mcrmessagesForm.controls['mcrMessages'];

        for (let mcrmessage of mcrmessages) {

          logger.debug("MCRMessagesManager:: " + mcrmessage.messagekey + ": " + mcrmessage.messagevalue);

          mcrMessagesFormArray.push(this.createitems(mcrmessage));
        }
      }
    )
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
