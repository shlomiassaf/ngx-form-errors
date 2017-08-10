import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxErrorTemplateDirective } from './ngx-error-defaults';
import { NgxErrorsService } from './ngx-errors.service';
import { NgxErrorsComponent } from './ngx-errors.component';

@NgModule({
  declarations: [
    NgxErrorTemplateDirective,
    NgxErrorsComponent
  ],
  imports: [ CommonModule ],
  exports: [
    NgxErrorTemplateDirective,
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
