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
import { Injectable, SkipSelf, Optional } from '@angular/core';
var NgxErrorsService = (function () {
    function NgxErrorsService() {
        this.defaultMsgs = {};
        this.scopes = new Map();
    }
    NgxErrorsService_1 = NgxErrorsService;
    NgxErrorsService.prototype.getScope = function (scope, alt) {
        return (scope && this.scopes.get(scope)) || alt || this.defaultScope;
    };
    NgxErrorsService.prototype.setScoped = function (scope, context) {
        this.scopes.set(scope, context);
    };
    NgxErrorsService.prototype.removeScoped = function (scope) {
        return this.scopes.delete(scope);
    };
    NgxErrorsService.prototype.setDefaultMessage = function (name, message) {
        this.defaultMsgs[name] = message;
    };
    NgxErrorsService.prototype.getDefaultMessage = function (name) {
        return this.defaultMsgs[name];
    };
    NgxErrorsService.clone = function (base) {
        var ngxErrorsService = new NgxErrorsService_1();
        if (base) {
            Object.assign(ngxErrorsService.defaultMsgs, base.defaultMsgs);
            ngxErrorsService.defaultScope = base.defaultScope;
            ngxErrorsService.scopes = new Map(base.scopes.entries());
        }
        return ngxErrorsService;
    };
    NgxErrorsService = NgxErrorsService_1 = __decorate([
        Injectable()
    ], NgxErrorsService);
    return NgxErrorsService;
    var NgxErrorsService_1;
}());
export { NgxErrorsService };
/**
 * @internal
 */
var NgxErrorsServiceContainer = (function () {
    function NgxErrorsServiceContainer(ngxErrorsService) {
        this.ngxErrorsService = ngxErrorsService;
    }
    NgxErrorsServiceContainer = __decorate([
        Injectable(),
        __param(0, SkipSelf()), __param(0, Optional()),
        __metadata("design:paramtypes", [NgxErrorsService])
    ], NgxErrorsServiceContainer);
    return NgxErrorsServiceContainer;
}());
export { NgxErrorsServiceContainer };
export function containerFactory(c) {
    return NgxErrorsService.clone(c.ngxErrorsService);
}
/**
 * A Provider array that will instruct the DI to inject a new instance of NgxErrorsService based
 * on the first instance of NgxErrorsService that exist up the DI tree.
 *
 * If instance does not exist will create an instance of NgxErrorsService based on nothing.
 */
export var NGX_ERRORS_SERVICE_CHILD_PROVIDERS = [
    NgxErrorsServiceContainer,
    {
        provide: NgxErrorsService,
        useFactory: containerFactory,
        deps: [NgxErrorsServiceContainer]
    }
];
//# sourceMappingURL=ngx-errors.service.js.map