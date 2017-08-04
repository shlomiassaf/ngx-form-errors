var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
/**
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Component({
            selector: 'app',
            encapsulation: ViewEncapsulation.None,
            styleUrls: [
                './app.component.css'
            ],
            template: "    \n      <nav>\n        <a [routerLink]=\" ['./'] \"\n          routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n          Index\n        </a>\n        <a [routerLink]=\" ['./showcase'] \"\n          routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n          Showcase\n        </a>\n      </nav>\n  \n      <main>\n        <router-outlet></router-outlet>\n      </main>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map