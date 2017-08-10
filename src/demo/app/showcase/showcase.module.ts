import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxFormErrorsModule, NgxErrorsService } from 'ngx-form-errors';

import { MaterialModule } from '../material.module';
import {
  ShowcaseHomeComponent,
  BasicFormComponent,
  ReactiveFormComponent,
  TemplateFormComponent,
  BY_FEATURE_COMPONENTS
} from './containers';

import {
  EmailValidatorDirective,
  PasswordValidatorDirective,
  FieldMatchValidatorDirective
} from './validators';

import { ROUTES } from './showcase.routes';

@NgModule({
  declarations: [
    ShowcaseHomeComponent,
    BasicFormComponent,
    ReactiveFormComponent,
    TemplateFormComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    FieldMatchValidatorDirective,
    ...BY_FEATURE_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxFormErrorsModule,
    RouterModule.forChild(ROUTES)
  ],
  entryComponents: [
    BasicFormComponent,
    ReactiveFormComponent,
    TemplateFormComponent,
    ...BY_FEATURE_COMPONENTS
  ]
})
export class ShowcaseModule {
  constructor(ngxErrors: NgxErrorsService) {

    /* Define a default message for the native `required` validator */
    ngxErrors.setDefaultMessage('required', 'This field is required');
    ngxErrors.setDefaultMessage('invalidEmailAddress', 'Invalid email address');
    ngxErrors.setDefaultMessage('invalidCreditCard', 'Is invalid credit card number');
    ngxErrors.setDefaultMessage('invalidPassword',
      'Invalid password. Password must be at least 6 characters long, and contain a number.');
  }
}

