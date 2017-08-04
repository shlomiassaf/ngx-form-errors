var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Input, QueryList, ViewContainerRef } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { filter } from 'rxjs/operator/filter';
import { NgxErrorsService } from './ngx-errors.service';
import { NgxErrorDefaultLocalTemplate, NgxErrorOverride } from './ngx-error-defaults';
var NgxErrorsComponent = (function () {
    function NgxErrorsComponent(ngxErrorsService, control, vcr) {
        this.ngxErrorsService = ngxErrorsService;
        this.control = control;
        this.vcr = vcr;
        this._exclude = [];
        this.unsubscribe = [];
        this.context = {};
    }
    Object.defineProperty(NgxErrorsComponent.prototype, "renderIf", {
        set: function (value) {
            this.context.renderIf = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(NgxErrorsComponent.prototype, "order", {
        set: function (value) {
            this.context.order = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(NgxErrorsComponent.prototype, "maxError", {
        set: function (value) {
            this.context.maxError = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(NgxErrorsComponent.prototype, "ngxErrors", {
        set: function (value) {
            var _this = this;
            if (value !== this._ngxErrors) {
                this.destroy();
                if (typeof value === 'string') {
                    this._ngxErrors = this.control.control.get(value);
                    if (!this._ngxErrors) {
                        this.addToWaitList(value);
                        return;
                    }
                }
                if (this._ngxErrors) {
                    var s = this._ngxErrors.statusChanges.subscribe(function (o) { return _this.update(); });
                    this.unsubscribe.push(s);
                    this.update();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxErrorsComponent.prototype, "exclude", {
        set: function (value) {
            if (this._exclude !== value) {
                this._exclude = Array.isArray(value) ? value : [];
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    NgxErrorsComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        Object.defineProperty(this, 'ready', { value: true });
        /*  Create the context.
            The context is determined by priority based on hierarchy, the order (high -> low):
             - Local template defined as content (NgxErrorDefaultLocalTemplate)
             - Default SCOPED template (NgxErrorDefaultTemplate defined within the ControlContainer)
             - Global Default template
         */
        var context = this.ngxErrorsService.getScope(this.control, this.localTemplate);
        // Now copy values from the context to the local context, skipping values that already exists
        // on the local context.
        Object.keys(context).forEach(function (k) {
            if (!_this.context[k]) {
                _this.context[k] = context[k];
            }
        });
        if (!this.context.maxError) {
            this.context.maxError = Number.POSITIVE_INFINITY;
        }
        var s = this.overrides.changes.subscribe(function () { return _this.update(); });
        this.unsubscribe.push(s);
        setTimeout(function () { return _this.update(); }, 16);
    };
    NgxErrorsComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    NgxErrorsComponent.prototype.hasControl = function (value) {
        return !!this.control.control.get(value);
    };
    NgxErrorsComponent.prototype.addToWaitList = function (value) {
        var _this = this;
        var unsub = filter.call(this.control.control.valueChanges, function () { return _this.hasControl(value); })
            .subscribe(function (obj) { return _this.ngxErrors = value; }); // ngxErrors setter will unsubscribe all
        this.unsubscribe.push(unsub);
    };
    NgxErrorsComponent.prototype.update = function () {
        var _this = this;
        if (this.ready) {
            this.vcr.clear();
            if (this._ngxErrors && this._ngxErrors.errors) {
                if (this.context.renderIf && !this.context.renderIf(this._ngxErrors)) {
                    return;
                }
                /* TODO:
                   `this._ngxErrors.errors` contains errors for the current controller without taking into
                   account errors of child controllers.
                   Using this._ngxErrors.invalid will reflect the full error state.
                   Explore supporting this feature.
                 */
                var errors_1 = this._ngxErrors.errors;
                var overrids_1 = this.overrides.toArray();
                var errorKeys = Object.keys(errors_1).filter(function (key) { return _this._exclude.indexOf(key) === -1; });
                var _a = this.context, order = _a.order, maxError = _a.maxError;
                if (Array.isArray(order)) {
                    for (var i = Math.min(order.length, maxError); i >= 0; i--) {
                        var idx = errorKeys.indexOf(order[i]);
                        if (idx > -1) {
                            errorKeys.unshift.apply(errorKeys, errorKeys.splice(idx, 1));
                        }
                    }
                }
                if (maxError > 0 && maxError < errorKeys.length) {
                    errorKeys.splice(maxError, errorKeys.length - maxError);
                }
                errorKeys.forEach(function (name) {
                    var template = overrids_1.find(function (o) { return o.name === name; });
                    var item = {
                        name: name,
                        message: errors_1[name] === true
                            ? _this.ngxErrorsService.getDefaultMessage(name)
                            : errors_1[name]
                    };
                    _this.vcr.createEmbeddedView(template ? template.templateRef : _this.context.template, { $implicit: item });
                });
            }
        }
    };
    NgxErrorsComponent.prototype.destroy = function () {
        while (this.unsubscribe.length > 0) {
            var s = this.unsubscribe.pop();
            if (!s.closed) {
                s.unsubscribe();
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], NgxErrorsComponent.prototype, "renderIf", null);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], NgxErrorsComponent.prototype, "order", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], NgxErrorsComponent.prototype, "maxError", null);
    __decorate([
        Input('ngxErrors'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgxErrorsComponent.prototype, "ngxErrors", null);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], NgxErrorsComponent.prototype, "exclude", null);
    __decorate([
        ContentChild(NgxErrorDefaultLocalTemplate),
        __metadata("design:type", NgxErrorDefaultLocalTemplate)
    ], NgxErrorsComponent.prototype, "localTemplate", void 0);
    __decorate([
        ContentChildren(NgxErrorOverride),
        __metadata("design:type", QueryList)
    ], NgxErrorsComponent.prototype, "overrides", void 0);
    NgxErrorsComponent = __decorate([
        Component({
            selector: '[ngxErrors]',
            template: '',
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [NgxErrorsService,
            ControlContainer,
            ViewContainerRef])
    ], NgxErrorsComponent);
    return NgxErrorsComponent;
}());
export { NgxErrorsComponent };
//# sourceMappingURL=ngx-errors.component.js.map