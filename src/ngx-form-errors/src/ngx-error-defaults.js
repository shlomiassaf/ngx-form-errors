var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, Input, Optional, TemplateRef, } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { NgxErrorsService } from './ngx-errors.service';
var NgxErrorDefaultTemplate = (function () {
    function NgxErrorDefaultTemplate(template, ngxErrorsService, control) {
        this.template = template;
        this.ngxErrorsService = ngxErrorsService;
        this.control = control;
        if (!control) {
            ngxErrorsService.defaultScope = this;
        }
        else {
            ngxErrorsService.setScoped(control, this);
        }
    }
    NgxErrorDefaultTemplate.prototype.ngOnDestroy = function () {
        if (this.control) {
            this.ngxErrorsService.removeScoped(this.control);
        }
        else if (this.ngxErrorsService.defaultScope.template === this.template) {
            this.ngxErrorsService.defaultScope.template = undefined;
        }
    };
    __decorate([
        Input('ngxErrorDefaultTemplateRenderIf'),
        __metadata("design:type", Function)
    ], NgxErrorDefaultTemplate.prototype, "renderIf", void 0);
    __decorate([
        Input('ngxErrorDefaultTemplateMaxError'),
        __metadata("design:type", Number)
    ], NgxErrorDefaultTemplate.prototype, "maxError", void 0);
    __decorate([
        Input('ngxErrorDefaultTemplateOrder'),
        __metadata("design:type", Array)
    ], NgxErrorDefaultTemplate.prototype, "order", void 0);
    NgxErrorDefaultTemplate = __decorate([
        Directive({
            selector: '[ngxErrorDefaultTemplate]'
        }),
        __param(2, Optional()),
        __metadata("design:paramtypes", [TemplateRef,
            NgxErrorsService,
            ControlContainer])
    ], NgxErrorDefaultTemplate);
    return NgxErrorDefaultTemplate;
}());
export { NgxErrorDefaultTemplate };
var NgxErrorDefaultLocalTemplate = (function () {
    function NgxErrorDefaultLocalTemplate(template) {
        this.template = template;
    }
    __decorate([
        Input('ngxErrorDefaultLocalTemplateRenderIf'),
        __metadata("design:type", Function)
    ], NgxErrorDefaultLocalTemplate.prototype, "renderIf", void 0);
    __decorate([
        Input('ngxErrorDefaultLocalTemplateMaxError'),
        __metadata("design:type", Number)
    ], NgxErrorDefaultLocalTemplate.prototype, "maxError", void 0);
    __decorate([
        Input('ngxErrorDefaultLocalTemplateOrder'),
        __metadata("design:type", Array)
    ], NgxErrorDefaultLocalTemplate.prototype, "order", void 0);
    NgxErrorDefaultLocalTemplate = __decorate([
        Directive({
            selector: '[ngxErrorDefaultLocalTemplate]'
        }),
        __metadata("design:paramtypes", [TemplateRef])
    ], NgxErrorDefaultLocalTemplate);
    return NgxErrorDefaultLocalTemplate;
}());
export { NgxErrorDefaultLocalTemplate };
var NgxErrorOverride = (function () {
    function NgxErrorOverride(templateRef) {
        this.templateRef = templateRef;
    }
    __decorate([
        Input('ngxErrorOverride'),
        __metadata("design:type", String)
    ], NgxErrorOverride.prototype, "name", void 0);
    NgxErrorOverride = __decorate([
        Directive({
            selector: '[ngxErrorOverride]'
        }),
        __metadata("design:paramtypes", [TemplateRef])
    ], NgxErrorOverride);
    return NgxErrorOverride;
}());
export { NgxErrorOverride };
//# sourceMappingURL=ngx-error-defaults.js.map