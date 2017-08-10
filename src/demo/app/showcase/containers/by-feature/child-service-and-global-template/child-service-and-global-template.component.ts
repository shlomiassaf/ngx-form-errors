import { Component, Inject, forwardRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxErrorsService, NGX_ERRORS_SERVICE_CHILD_PROVIDERS } from 'ngx-form-errors';

import { ShowcaseHomeComponent } from '../../showcase-home/showcase-home.component';

import { BaseComponent } from '../base-component';

@Component({
  selector: 'child-service-and-global-template',
  templateUrl: 'child-service-and-global-template.component.html',
  // create a new instance of NgxErrorsService based on a parent NgxErrorsService.
  providers: NGX_ERRORS_SERVICE_CHILD_PROVIDERS
})
export class ChildServiceAndGlobalTemplateComponent extends BaseComponent {
  constructor(formBuilder: FormBuilder,
              ngxErrorsService: NgxErrorsService,
              @Inject(forwardRef(() => ShowcaseHomeComponent)) parent: ShowcaseHomeComponent) {
    super(formBuilder, ngxErrorsService, parent);
    ngxErrorsService.setDefaultMessage('required', 'ALTERNATE REQUIRED MESSAGE');
  }

  static NAV_META = {
    title: 'Child Service & Global Template'
  };
}