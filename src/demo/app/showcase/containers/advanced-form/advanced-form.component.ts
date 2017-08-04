import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxErrorsService, NGX_ERRORS_SERVICE_CHILD_PROVIDERS } from 'ngx-form-errors';

import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';

@Component({
  selector: 'advanced-form',
  templateUrl: 'advanced-form.component.html',
  // create a new instance of NgxErrorsService based on a parent NgxErrorsService.
  providers: NGX_ERRORS_SERVICE_CHILD_PROVIDERS
})
export class AdvancedFormComponent extends ReactiveFormComponent {
  constructor(formBuilder: FormBuilder, ngxErrorsService: NgxErrorsService) {
    super(formBuilder);
    ngxErrorsService.setDefaultMessage('required', 'ALTERNATE REQUIRED MESSAGE');
  }
}
