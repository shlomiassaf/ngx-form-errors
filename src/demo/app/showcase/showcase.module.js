var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormErrorsModule, NgxErrorsService } from 'ngx-form-errors';
import { MaterialModule } from '../material.module';
import { ShowcaseHomeComponent, BasicFormComponent, ReactiveFormComponent, TemplateFormComponent, AdvancedFormComponent, DefaultScopedAndLocalTempalteComponent } from './containers';
import { EmailValidatorDirective, PasswordValidatorDirective, FieldMatchValidatorDirective } from './validators';
import { ROUTES } from './showcase.routes';
var ShowcaseModule = (function () {
    function ShowcaseModule(ngxErrors) {
        /* Define a default message for the native `required` validator */
        ngxErrors.setDefaultMessage('required', 'This field is required');
        ngxErrors.setDefaultMessage('invalidEmailAddress', 'Invalid email address');
        ngxErrors.setDefaultMessage('invalidCreditCard', 'Is invalid credit card number');
        ngxErrors.setDefaultMessage('invalidPassword', 'Invalid password. Password must be at least 6 characters long, and contain a number.');
    }
    ShowcaseModule = __decorate([
        NgModule({
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
        }),
        __metadata("design:paramtypes", [NgxErrorsService])
    ], ShowcaseModule);
    return ShowcaseModule;
}());
export { ShowcaseModule };
//# sourceMappingURL=showcase.module.js.map