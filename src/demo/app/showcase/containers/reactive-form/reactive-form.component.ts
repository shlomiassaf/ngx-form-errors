import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as validators from '../../validators';
import { User, UserRoles } from '../../user';

@Component({
  selector: 'reactive-driven-form',
  templateUrl: 'reactive-form.component.html'
})
export class ReactiveFormComponent {
  userForm: FormGroup;
  model: User = new User();

  readonly userRoles = UserRoles;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name:             [this.model.name, Validators.required],
      password:         [this.model.password, [Validators.required, validators.passwordValidator]],
      confirmPassword:  [this.model.confirmPassword, Validators.required],
      email:            [this.model.email, [Validators.required, validators.emailValidator]],
      role:             [this.model.role, Validators.required]
    }, {
      validator: validators.fieldMatchValidator(['password', 'confirmPassword'],
        'Password does not match')
    });
  }

}
