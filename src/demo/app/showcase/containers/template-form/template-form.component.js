var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { User, UserRoles } from '../../user';
var TemplateFormComponent = (function () {
    function TemplateFormComponent() {
        this.model = new User();
        this.userRoles = UserRoles;
    }
    TemplateFormComponent = __decorate([
        Component({
            selector: 'template-driven-form',
            templateUrl: 'template-form.component.html'
        })
    ], TemplateFormComponent);
    return TemplateFormComponent;
}());
export { TemplateFormComponent };
//# sourceMappingURL=template-form.component.js.map