var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { MdRippleModule, OverlayModule, CompatibilityModule, MdButtonToggleModule, MdButtonModule, MdCheckboxModule, MdRadioModule, MdSelectModule, MdSlideToggleModule, MdSliderModule, MdSidenavModule, MdListModule, MdGridListModule, MdCardModule, MdChipsModule, MdIconModule, MdProgressSpinnerModule, MdProgressBarModule, MdInputModule, MdSnackBarModule, MdTabsModule, MdToolbarModule, MdTooltipModule, MdMenuModule, MdDialogModule, MdAutocompleteModule, StyleModule, MdExpansionModule, MdSortModule, MdPaginatorModule } from '@angular/material';
import { A11yModule, BidiModule, CdkTableModule, ObserveContentModule, PlatformModule, PortalModule } from '@angular/cdk';
var MATERIAL_MODULES = [
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdCheckboxModule,
    CdkTableModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    StyleModule,
    CompatibilityModule,
    A11yModule,
    BidiModule,
    CdkTableModule,
    ObserveContentModule,
    PlatformModule,
    PortalModule,
    MdSortModule,
    MdPaginatorModule
];
var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        NgModule({
            imports: MATERIAL_MODULES,
            exports: MATERIAL_MODULES,
        })
    ], MaterialModule);
    return MaterialModule;
}());
export { MaterialModule };
//# sourceMappingURL=material.module.js.map