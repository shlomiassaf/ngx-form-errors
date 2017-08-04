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
import * as validators from '../../validators';
import { User, UserRoles } from '../../user';
var ReactiveFormComponent = (function () {
    function ReactiveFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.model = new User();
        this.userRoles = UserRoles;
        this.userForm = this.formBuilder.group({
            name: [this.model.name, Validators.required],
            password: [this.model.password, [Validators.required, validators.passwordValidator]],
            confirmPassword: [this.model.confirmPassword, Validators.required],
            email: [this.model.email, [Validators.required, validators.emailValidator]],
            role: [this.model.role, Validators.required]
        }, {
            validator: validators.fieldMatchValidator(['password', 'confirmPassword'], 'Password does not match')
        });
    }
    ReactiveFormComponent = __decorate([
        Component({
            selector: 'reactive-driven-form',
            templateUrl: 'reactive-form.component.html'
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], ReactiveFormComponent);
    return ReactiveFormComponent;
}());
export { ReactiveFormComponent };
//# sourceMappingURL=reactive-form.component.js.map