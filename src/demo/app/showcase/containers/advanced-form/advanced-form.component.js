var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { FormBuilder } from '@angular/forms';
import { NgxErrorsService, NGX_ERRORS_SERVICE_CHILD_PROVIDERS } from 'ngx-form-errors';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
var AdvancedFormComponent = (function (_super) {
    __extends(AdvancedFormComponent, _super);
    function AdvancedFormComponent(formBuilder, ngxErrorsService) {
        var _this = _super.call(this, formBuilder) || this;
        ngxErrorsService.setDefaultMessage('required', 'ALTERNATE REQUIRED MESSAGE');
        return _this;
    }
    AdvancedFormComponent = __decorate([
        Component({
            selector: 'advanced-form',
            templateUrl: 'advanced-form.component.html',
            // create a new instance of NgxErrorsService based on a parent NgxErrorsService.
            providers: NGX_ERRORS_SERVICE_CHILD_PROVIDERS
        }),
        __metadata("design:paramtypes", [FormBuilder, NgxErrorsService])
    ], AdvancedFormComponent);
    return AdvancedFormComponent;
}(ReactiveFormComponent));
export { AdvancedFormComponent };
//# sourceMappingURL=advanced-form.component.js.map