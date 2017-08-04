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
  AdvancedFormComponent,
  DefaultScopedAndLocalTempalteComponent
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
    AdvancedFormComponent,
    DefaultScopedAndLocalTempalteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxFormErrorsModule,
    RouterModule.forChild(ROUTES)
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

