import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxErrorDefaultLocalTemplate, NgxErrorDefaultTemplate, NgxErrorOverride } from './ngx-error-defaults';
import { NgxErrorsService } from './ngx-errors.service';
import { NgxErrorsComponent } from './ngx-errors.component';

@NgModule({
  declarations: [
    NgxErrorDefaultLocalTemplate,
    NgxErrorDefaultTemplate,
    NgxErrorOverride,
    NgxErrorsComponent
  ],
  imports: [ CommonModule ],
  exports: [
    NgxErrorDefaultLocalTemplate,
    NgxErrorDefaultTemplate,
    NgxErrorOverride,
    NgxErrorsComponent
  ]
})
export class NgxFormErrorsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxFormErrorsModule,
      providers: [ NgxErrorsService ]
    };
  }

}
