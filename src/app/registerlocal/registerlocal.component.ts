import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registerlocal',
  templateUrl: './registerlocal.component.html',
  styleUrls: ['./registerlocal.component.css']
})
export class RegisterlocalComponent {

  rForm: FormGroup;
  post: any;                     // A property for our submitted form
  localuser_identification: string = '';
  localuser_name: string = '';
  localuser_mail: string = '';
  localuser_password: string = '';
  localuser_password_repeat: string = '';

  identificationAlert: string = 'This field is required';

  constructor(private fb: FormBuilder) {

    this.rForm = fb.group({
      'localuser_identification': [null, Validators.required],
      'localuser_name': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'localuser_mail': '',
      'localuser_password': '',
      'localuser_password_repeat': ''
    });
  }

  ngOnInit() {

  }

  addPost(post) {

  }
}
