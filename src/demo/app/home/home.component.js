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
import { AppState } from '../app.service';
var HomeComponent = (function () {
    /**
     * TypeScript public modifiers
     */
    function HomeComponent(appState) {
        this.appState = appState;
        /**
         * Set our default values
         */
        this.localState = { value: '' };
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log('hello `Home` component');
        /**
         * this.title.getData().subscribe(data => this.data = data);
         */
    };
    HomeComponent.prototype.submitState = function (value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    };
    HomeComponent = __decorate([
        Component({
            selector: 'home',
            /**
             * Our list of styles in our component. We may add more to compose many styles together.
             */
            styleUrls: ['./home.component.css'],
            /**
             * Every Angular template is first compiled by the browser before Angular runs it's compiler.
             */
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [AppState])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map