var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxErrorDefaultLocalTemplate, NgxErrorDefaultTemplate, NgxErrorOverride } from './ngx-error-defaults';
import { NgxErrorsService } from './ngx-errors.service';
import { NgxErrorsComponent } from './ngx-errors.component';
var NgxFormErrorsModule = (function () {
    function NgxFormErrorsModule() {
    }
    NgxFormErrorsModule_1 = NgxFormErrorsModule;
    NgxFormErrorsModule.forRoot = function () {
        return {
            ngModule: NgxFormErrorsModule_1,
            providers: [NgxErrorsService]
        };
    };
    NgxFormErrorsModule = NgxFormErrorsModule_1 = __decorate([
        NgModule({
            declarations: [
                NgxErrorDefaultLocalTemplate,
                NgxErrorDefaultTemplate,
                NgxErrorOverride,
                NgxErrorsComponent
            ],
            imports: [CommonModule],
            exports: [
                NgxErrorDefaultLocalTemplate,
                NgxErrorDefaultTemplate,
                NgxErrorOverride,
                NgxErrorsComponent
            ]
        })
    ], NgxFormErrorsModule);
    return NgxFormErrorsModule;
    var NgxFormErrorsModule_1;
}());
export { NgxFormErrorsModule };
//# sourceMappingURL=module.js.map