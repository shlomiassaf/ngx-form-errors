import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

import { emailValidator, passwordValidator, fieldMatchValidator } from './validators';

@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: emailValidator, multi: true }
  ]
})
export class EmailValidatorDirective { }

@Directive({
  selector: '[validatePassword][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: passwordValidator, multi: true }
  ]
})
export class PasswordValidatorDirective { }

@Directive({
  selector: '[validateFieldMatch][ngModelGroup], form[validateFieldMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      /* tslint:disable-next-line */
      useExisting: forwardRef(() => FieldMatchValidatorDirective),
      multi: true
    }
  ]
})
export class FieldMatchValidatorDirective {

  validator: Function;

  @Input() set validateFieldMatch(config: {fields: string[], msg: string, negate?: boolean}) {
    if (config && Array.isArray(config.fields) && config.fields.length > 1) {
      this.validator = fieldMatchValidator(config.fields, config.msg || true);
    } else {
      this.validator = undefined;
    }
  }

  validate(c: AbstractControl) {
    return this.validator
      ? this.validator(c)
      : null
    ;
  }
}
