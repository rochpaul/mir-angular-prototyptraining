import {Component, Input} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-simple-confirm',
  templateUrl: './simple-confirm.component.html',
  styleUrls: ['./simple-confirm.component.css']
})
export class SimpleConfirmComponent {

  constructor(public dialogRef: MdDialogRef<SimpleConfirmComponent>) {
  }

  public confirmMessage: string;
}
