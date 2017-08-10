import { Component, Inject, forwardRef } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { NgxErrorsService } from 'ngx-form-errors';

import { ShowcaseHomeComponent } from '../../showcase-home/showcase-home.component';

import { BaseComponent } from '../base-component';

@Component({
  selector: 'render-if',
  templateUrl: 'render-if.component.html'
})
export class RenderIfComponent extends BaseComponent {

  renderIfScoped: boolean;
  renderIfPass: boolean;

  constructor(formBuilder: FormBuilder,
              ngxErrorsService: NgxErrorsService,
              @Inject(forwardRef(() => ShowcaseHomeComponent)) parent: ShowcaseHomeComponent) {
    super(formBuilder, ngxErrorsService, parent);

    this.renderIfScopedFn = this.renderIfScopedFn.bind(this);
    this.renderIfPassFn = this.renderIfPassFn.bind(this);
  }

  renderIfScopedFn(c: AbstractControl): boolean {
    return this.renderIfScoped;
  }

  renderIfPassFn(c: AbstractControl): boolean {
    return this.renderIfPass;
  }

  static NAV_META = {
    title: 'Render If'
  };
}
