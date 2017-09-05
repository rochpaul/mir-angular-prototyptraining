import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registerlocal',
  templateUrl: './registerlocal.component.html',
  styleUrls: ['./registerlocal.component.css']
})
export class RegisterlocalComponent {

  registrationForm: FormGroup;
  post: any;                     // A property for our submitted form

  constructor(private fb: FormBuilder) {

    this.registrationForm = fb.group({
      'localuser_identification': [null, Validators.compose([Validators.required, Validators.maxLength(16)])],
      'localuser_name': [null, Validators.compose([Validators.required, Validators.maxLength(64)])],
      'localuser_mail': [null, Validators.compose([Validators.required, Validators.maxLength(64)])],
      'localuser_password': [null, Validators.required],
      'localuser_password_repeat': [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  addPost(post) {

  }
}
