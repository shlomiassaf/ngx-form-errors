var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxErrorsService, NGX_ERRORS_SERVICE_CHILD_PROVIDERS } from 'ngx-form-errors';
import * as validators from '../../../validators';
var createGroup = function (formBuilder) { return formBuilder.group({
    password: ['', [
            Validators.required,
            validators.passwordValidator,
            function (c) { return ({ alwaysFail1: true }); },
            function (c) { return ({ alwaysFail2: true }); },
            function (c) { return ({ alwaysFail3: true }); },
            function (c) { return ({ alwaysFail4: true }); }
        ]],
}); };
var DefaultScopedAndLocalTempalteComponent = (function () {
    function DefaultScopedAndLocalTempalteComponent(formBuilder, ngxErrorsService) {
        this.formBuilder = formBuilder;
        this.form1 = createGroup(this.formBuilder);
        this.form2 = createGroup(this.formBuilder);
        ngxErrorsService.setDefaultMessage('required', 'ALTERNATE REQUIRED MESSAGE');
        ngxErrorsService.setDefaultMessage('alwaysFail1', 'Constant Error # 1');
        ngxErrorsService.setDefaultMessage('alwaysFail2', 'Constant Error # 2');
        ngxErrorsService.setDefaultMessage('alwaysFail3', 'Constant Error # 3');
        ngxErrorsService.setDefaultMessage('alwaysFail4', 'Constant Error # 4');
    }
    DefaultScopedAndLocalTempalteComponent = __decorate([
        Component({
            selector: 'default-scoped-and-local-templates',
            templateUrl: 'defult-scoped-and-local-templates.component.html',
            // create a new instance of NgxErrorsService based on a parent NgxErrorsService.
            providers: NGX_ERRORS_SERVICE_CHILD_PROVIDERS
        }),
        __metadata("design:paramtypes", [FormBuilder, NgxErrorsService])
    ], DefaultScopedAndLocalTempalteComponent);
    return DefaultScopedAndLocalTempalteComponent;
}());
export { DefaultScopedAndLocalTempalteComponent };
//# sourceMappingURL=defult-scoped-and-local-templates.component.js.map