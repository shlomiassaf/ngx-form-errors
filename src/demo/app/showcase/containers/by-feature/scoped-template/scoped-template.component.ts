import { Component, Inject, forwardRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxErrorsService } from 'ngx-form-errors';

import { ShowcaseHomeComponent } from '../../showcase-home/showcase-home.component';

import { BaseComponent } from '../base-component';

@Component({
  selector: 'scoped-template',
  templateUrl: 'scoped-template.component.html'
})
export class ScopedTemplateComponent extends BaseComponent {
  constructor(formBuilder: FormBuilder,
              ngxErrorsService: NgxErrorsService,
              @Inject(forwardRef(() => ShowcaseHomeComponent)) parent: ShowcaseHomeComponent) {
    super(formBuilder, ngxErrorsService, parent);
  }

  static NAV_META = {
    title: 'Scoped Template'
  };
}
