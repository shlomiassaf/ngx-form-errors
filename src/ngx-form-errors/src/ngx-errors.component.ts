import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { filter } from 'rxjs/operator/filter';
import { Subscription } from 'rxjs/Subscription';

import { NgxDisplayContext } from './models';
import { NgxErrorsService } from './ngx-errors.service';

/**
 * A Component that render form errors for a form controller attached to it.
 *
 * The component is used as a directive on any renderable element (i.e. not on `ng-container`).
 *
 * ```html
 * <input type="password" id="password" formControlName="password" />
 * <div ngxErrors="password"></div>
 * ```
 *
 * > -  The component is used as a placeholder and all errors are added as siblings to the component.
 * This approach enables support for content projected error directive, e.g. material's `md-error`.
 * > -  The actual rendered content is based on the scoped template and not on the component
 *
 *
 */
@Component({
  selector: '[ngxErrors]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxErrorsComponent implements  OnDestroy, AfterContentInit {

  /**
   * A predicate that allows filtering out error message right before they are displayed.
   * @param c
   */
  @Input() set renderIf(value: (c: AbstractControl) => boolean) {
    this.context.renderIf = value;
  };

  /**
   * A list of error keys that defines the order of which errors appear.
   *
   * The list can be partial, following errors will display in the order they were added.
   */
  @Input() set order(value: string[]) {
    this.context.order = value;
  };

  /**
   * Maximum number of errors to display
   */
  @Input() set maxError(value: number) {
    this.context.maxError = value;
  };

  /**
   * A string or a control that is the source of errors for this component.
   *
   * When a string is used, a lookup is done on the first `ControlContainer` up the (DOM) tree.
   * The `ControlContainer` is an `@angular/forms` abstract form control that acts as a container
   * for other forms controls. It can be `NgForm` but can vary based on the forms module used.
   * In a Template-Driven form it can be `NgModelGroup` (but most likely `NgForm`) and in a Reactive
   * form it will usually be `FormGroup`.
   *
   * > Remember, the first container is the source.
   *
   * #### Reactive Form:
   * The string `email` will be used to search for a control named `email` on the `FormGroup` **userForm**
   *
   * ```html
   * <form [formGroup]="userForm">
   *   <label class="col-sm-2 form-control-label" for="email">Email</label>
   *   <div class="col-sm-10">
   *     <input type="email" id="email" class="form-control" formControlName="email" />
   *     <div ngxErrors="email"></div>
   *   </div>
   * </form>
   * ```
   *
   * #### Template-Driven Form:
   * The string `email` will be used to search for a control named `email` on the `NgForm`
   * ```html
   * <form #userForm="ngForm"
   *   <label class="col-sm-2 form-control-label" for="email">Email</label>
   *   <div class="col-sm-10">
   *     <input type="text" id="email" class="form-control" name="email"
   *     [(ngModel)]="model.email"
   *     required validateEmail>
   *     <div ngxErrors="email"></div>
   *   </div>
   * </form>
   * ```
   */
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
      else if (value instanceof AbstractControl) {
        this._ngxErrors = value;
      }

      if (this._ngxErrors) {
        const s = this._ngxErrors.statusChanges.subscribe( o => this.update() );
        this.unsubscribe.push(s);
        this.update();
      }
    }
  }

  /**
   * A list of error keys (e.g. "required") that will be excluded (i.e. will not render)
   * This is a full-compare version of `renderIf` in {@link NgxErrorsComponent}
   * @param value
   */
  @Input() set exclude(value: string[]) {
    if (this._exclude !== value) {
      this._exclude = Array.isArray(value) ? value : [];
      this.update();
    }
  }

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
         - Local template defined as content
         - Default SCOPED template (NgxErrorTemplate defined within the ControlContainer)
         - Global Default template
     */
    const context = this.ngxErrorsService.getContextStore(this, this.control).get();

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

    setTimeout(() => this.update(), 16);
  }

  /** @internal */
  ngOnDestroy(): void {
    this.ngxErrorsService.removeScope(this);
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
        const contextStore = this.ngxErrorsService.getContextStore(this, this.control);

        const errors = this._ngxErrors.errors;
        const overrids = contextStore.mergedKeys();

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
            const template = overrids[name];

            const item = {
              name,
              message: errors[name] === true
                ? this.ngxErrorsService.getDefaultMessage(name)
                : errors[name]
            };

            this.vcr.createEmbeddedView(
              template ? template.template : this.context.template,
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
