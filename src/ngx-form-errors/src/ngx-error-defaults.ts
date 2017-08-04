import {
  Directive,
  Input,
  OnDestroy,
  Optional,
  TemplateRef,
} from '@angular/core';
import { ControlContainer, AbstractControl } from '@angular/forms';

import { NgxDisplayContext, NgxErrorsContext } from './models';
import { NgxErrorsService } from './ngx-errors.service';

@Directive({
  selector: '[ngxErrorDefaultTemplate]'
})
export class NgxErrorDefaultTemplate implements NgxDisplayContext, OnDestroy {

  @Input('ngxErrorDefaultTemplateRenderIf') renderIf: (c: AbstractControl) => boolean;

  @Input('ngxErrorDefaultTemplateMaxError') maxError: number;

  @Input('ngxErrorDefaultTemplateOrder') order: string[];

  constructor(public template: TemplateRef<NgxErrorsContext>,
              private ngxErrorsService: NgxErrorsService,
              @Optional() private control?: ControlContainer) {
    if (!control) {
      ngxErrorsService.defaultScope = this;
    } else {
      ngxErrorsService.setScoped(control, this);
    }
  }

  ngOnDestroy(): void {
    if (this.control) {
      this.ngxErrorsService.removeScoped(this.control);
    } else if (this.ngxErrorsService.defaultScope.template === this.template) {
      this.ngxErrorsService.defaultScope.template = undefined;
    }
  }
}

@Directive({
  selector: '[ngxErrorDefaultLocalTemplate]'
})
export class NgxErrorDefaultLocalTemplate implements NgxDisplayContext {
  @Input('ngxErrorDefaultLocalTemplateRenderIf') renderIf: (c: AbstractControl) => boolean;
  @Input('ngxErrorDefaultLocalTemplateMaxError') maxError: number;
  @Input('ngxErrorDefaultLocalTemplateOrder') order: string[];

  constructor(public template: TemplateRef<NgxErrorsContext>) { }
}

@Directive({
  selector: '[ngxErrorOverride]'
})
export class NgxErrorOverride {

  @Input('ngxErrorOverride') name: string;

  constructor(public templateRef: TemplateRef<NgxErrorsContext>) { }

}