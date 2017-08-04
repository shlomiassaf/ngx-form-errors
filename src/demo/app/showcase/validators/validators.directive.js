var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { emailValidator, passwordValidator, fieldMatchValidator } from './validators';
var EmailValidatorDirective = (function () {
    function EmailValidatorDirective() {
    }
    EmailValidatorDirective = __decorate([
        Directive({
            selector: '[validateEmail][ngModel]',
            providers: [
                { provide: NG_VALIDATORS, useValue: emailValidator, multi: true }
            ]
        })
    ], EmailValidatorDirective);
    return EmailValidatorDirective;
}());
export { EmailValidatorDirective };
var PasswordValidatorDirective = (function () {
    function PasswordValidatorDirective() {
    }
    PasswordValidatorDirective = __decorate([
        Directive({
            selector: '[validatePassword][ngModel]',
            providers: [
                { provide: NG_VALIDATORS, useValue: passwordValidator, multi: true }
            ]
        })
    ], PasswordValidatorDirective);
    return PasswordValidatorDirective;
}());
export { PasswordValidatorDirective };
var FieldMatchValidatorDirective = (function () {
    function FieldMatchValidatorDirective() {
    }
    FieldMatchValidatorDirective_1 = FieldMatchValidatorDirective;
    Object.defineProperty(FieldMatchValidatorDirective.prototype, "validateFieldMatch", {
        set: function (config) {
            if (config && Array.isArray(config.fields) && config.fields.length > 1) {
                this.validator = fieldMatchValidator(config.fields, config.msg || true);
            }
            else {
                this.validator = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    FieldMatchValidatorDirective.prototype.validate = function (c) {
        return this.validator
            ? this.validator(c)
            : null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FieldMatchValidatorDirective.prototype, "validateFieldMatch", null);
    FieldMatchValidatorDirective = FieldMatchValidatorDirective_1 = __decorate([
        Directive({
            selector: '[validateFieldMatch][ngModelGroup], form[validateFieldMatch]',
            providers: [
                {
                    provide: NG_VALIDATORS,
                    /* tslint:disable-next-line */
                    useExisting: forwardRef(function () { return FieldMatchValidatorDirective_1; }),
                    multi: true
                }
            ]
        })
    ], FieldMatchValidatorDirective);
    return FieldMatchValidatorDirective;
    var FieldMatchValidatorDirective_1;
}());
export { FieldMatchValidatorDirective };
//# sourceMappingURL=validators.directive.js.map