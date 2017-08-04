import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { filter } from 'rxjs/operator/filter';
import { Subscription } from 'rxjs/Subscription';

import { NgxDisplayContext } from './models';
import { NgxErrorsService } from './ngx-errors.service';
import { NgxErrorDefaultLocalTemplate, NgxErrorOverride } from './ngx-error-defaults';

@Component({
  selector: '[ngxErrors]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxErrorsComponent implements OnDestroy, AfterContentInit {

  @Input() set renderIf(value: (c: AbstractControl) => boolean) {
    this.context.renderIf = value;
  };

  @Input() set order(value: string[]) {
    this.context.order = value;
  };

  @Input() set maxError(value: number) {
    this.context.maxError = value;
  };

  @Input('ngxErrors') set ngxErrors(value: AbstractControl | string) {
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
        const s = this._ngxErrors.statusChanges.subscribe( o => this.update() );
        this.unsubscribe.push(s);
        this.update();
      }
    }
  }

  @Input() set exclude(value: string[]) {
    if (this._exclude !== value) {
      this._exclude = Array.isArray(value) ? value : [];
      this.update();
    }
  }

  @ContentChild(NgxErrorDefaultLocalTemplate) localTemplate: NgxErrorDefaultLocalTemplate;
  @ContentChildren(NgxErrorOverride) overrides: QueryList<NgxErrorOverride>;

  private _exclude: string[] = [];
  private _ngxErrors: AbstractControl;
  private unsubscribe: Subscription[] = [];
  private ready: boolean;
  private context: NgxDisplayContext = {} as any;

  constructor(private ngxErrorsService: NgxErrorsService,
              private control: ControlContainer,
              private vcr: ViewContainerRef) { }

  ngAfterContentInit(): void {
    Object.defineProperty(this, 'ready', { value: true } );

    /*  Create the context.
        The context is determined by priority based on hierarchy, the order (high -> low):
         - Local template defined as content (NgxErrorDefaultLocalTemplate)
         - Default SCOPED template (NgxErrorDefaultTemplate defined within the ControlContainer)
         - Global Default template
     */
    const context = this.ngxErrorsService.getScope(this.control, this.localTemplate);

    // Now copy values from the context to the local context, skipping values that already exists
    // on the local context.
    Object.keys(context).forEach( k => {
      if (!this.context[k]) {
        this.context[k] = context[k];
      }
    });

    if (!this.context.maxError) {
      this.context.maxError = Number.POSITIVE_INFINITY;
    }

    const s = this.overrides.changes.subscribe(() => this.update());
    this.unsubscribe.push(s);

    setTimeout(() => this.update(), 16);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private hasControl(value: string): boolean {
    return !!this.control.control.get(value);
  }

  private addToWaitList(value: string): void {
    const unsub = filter.call(this.control.control.valueChanges, () => this.hasControl(value))
      .subscribe( obj => this.ngxErrors = value ); // ngxErrors setter will unsubscribe all
    this.unsubscribe.push(unsub);
  }

  private update(): void {
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
        const errors = this._ngxErrors.errors;
        const overrids = this.overrides.toArray();

        const errorKeys = Object.keys(errors).filter(key => this._exclude.indexOf(key) === -1);

        const { order, maxError } = this.context;

        if (Array.isArray(order)) {
          for (let i = Math.min(order.length, maxError); i >= 0; i--) {
            const idx = errorKeys.indexOf(order[i]);
            if (idx > -1) {
              errorKeys.unshift(...errorKeys.splice(idx, 1));
            }
          }
        }

        if (maxError > 0 && maxError < errorKeys.length) {
          errorKeys.splice(maxError, errorKeys.length - maxError);
        }

        errorKeys.forEach(name => {
            const template = overrids.find( o => o.name === name );
            const item = {
              name,
              message: errors[name] === true
                ? this.ngxErrorsService.getDefaultMessage(name)
                : errors[name]
            };

            this.vcr.createEmbeddedView(
              template ? template.templateRef : this.context.template,
              { $implicit: item }
            );
          });
      }
    }
  }

  private destroy(): void {
    while (this.unsubscribe.length > 0) {
      const s = this.unsubscribe.pop();
      if (!s.closed) {
        s.unsubscribe();
      }
    }

  }
}
