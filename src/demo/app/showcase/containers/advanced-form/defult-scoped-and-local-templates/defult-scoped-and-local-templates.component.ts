import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgxErrorsService, NGX_ERRORS_SERVICE_CHILD_PROVIDERS } from 'ngx-form-errors';

import * as validators from '../../../validators';

const createGroup = formBuilder => formBuilder.group({
  password:         ['', [
    Validators.required,
    validators.passwordValidator,
    c => ({ alwaysFail1: true }),
    c => ({ alwaysFail2: true }),
    c => ({ alwaysFail3: true }),
    c => ({ alwaysFail4: true })
  ]],
});

@Component({
  selector: 'default-scoped-and-local-templates',
  templateUrl: 'defult-scoped-and-local-templates.component.html',
  // create a new instance of NgxErrorsService based on a parent NgxErrorsService.
  providers: NGX_ERRORS_SERVICE_CHILD_PROVIDERS
})
export class DefaultScopedAndLocalTempalteComponent {
  form1: FormGroup;
  form2: FormGroup;

  constructor(private formBuilder: FormBuilder, ngxErrorsService: NgxErrorsService) {
    this.form1 = createGroup(this.formBuilder);
    this.form2 = createGroup(this.formBuilder);

    ngxErrorsService.setDefaultMessage('required', 'ALTERNATE REQUIRED MESSAGE');
    ngxErrorsService.setDefaultMessage('alwaysFail1', 'Constant Error # 1');
    ngxErrorsService.setDefaultMessage('alwaysFail2', 'Constant Error # 2');
    ngxErrorsService.setDefaultMessage('alwaysFail3', 'Constant Error # 3');
    ngxErrorsService.setDefaultMessage('alwaysFail4', 'Constant Error # 4');

  }

}
