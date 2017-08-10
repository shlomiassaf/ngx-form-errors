import {
  OnInit,
  Directive,
  Input,
  OnDestroy,
  Optional,
  TemplateRef
} from '@angular/core';
import { ControlContainer, AbstractControl } from '@angular/forms';

import { NgxDisplayContext, NgxErrorsContext } from './models';
import { NgxErrorsService } from './ngx-errors.service';
import { NgxErrorsComponent } from './ngx-errors.component';

/**
 * A directive that capture and define the error template, the template is used to render errors.
 *
 * A Template definition is both UI rendering instructions and a configuration object, the `@Input`s
 * on the directive is the API on which configuration is set.
 *
 * Each Template definition becomes a context that hold the `TemplateRef` and configuration.
 * The implicit context of the template is {@link ErrorItem}.
 *
 * Below is an example for a basic error template definition, defined at the first line of the
 * application root component:
 *
 * ```html
 * <div *ngxErrorTemplate="let item;">
 *   <small>{{item.message}}</small>
 * </div>
 * ```
 *
 * It contains instructions how to render a form error, in our case as a **div** element with a
 * child **small** element that holds the error message.
 *
 * We can also add some configuration, here's a revised example with some configuration:
 *
 * ```html
 * <div *ngxErrorTemplate="let item; maxError: 2, order: ['required']">
 *   <small>{{item.message}}</small>
 * </div>
 * ```
 * We render the same but we also limit to 2 errors displayed and making sure that the **required**
 * error is displayed first.
 *
 * > Template definitions live on the template, when the host of the template (i.e. the component)
 * is destroyed the template is destroyed as well, make sure you are not declaring global templates
 * on the root of a reusable component (e.g. pages), Instead use scoped templates.
 * This does not apply when the component has a provider defined to create a new instance of
 * {@link NgxErrorsService}.
 *
 * ## Advanced Usage:
 * The above is the basic setup, in a lot of cases it's enough but some might want a more
 * fine-grained control, being able to define a global template but also define:
 *
 *   - A template for specific errors (e.g. "required")
 *   - A template for a specific form or a specific control
 *   - A complete new configuration per module / component
 *
 * Error template definition is hierarchy based, the position (DOM) of the template and the
 * `errorKey` value (set / not set) creates an hierarchy tree which is used to determine which
 * template to use when rendering an error.
 *
 * Context (Template definition) live within a Context Store.
 *
 * Context store holds a global context and a map of contexts bound to specific error keys.
 * Context Store also holds a reference to a parent store (except the root store).
 *
 * ```html
 * <div *ngxErrorTemplate="let item;">
 *   <small>{{item.message}}</small>
 * </div>
 *
 * <div *ngxErrorTemplate="let item; errorKey: 'required'">
 *   <small>IMPORTANT: {{item.message}}</small>
 * </div>
 * ```
 *
 * In the example above the 2 consecutive template definitions will be on the same store. The 1st
 * will be the global, then 2nd will be a specific error template for the `required` error.
 *
 * > Adding a 3rd template without an `errorKey` will just override the first template.
 *
 * A context store is bound to it's immediate {@link NgxErrorsService} instance (Angular service).
 * {@link NgxErrorsService} holds 2 types of stores, the global (default) store and a scoped store.
 *
 * A context store is just a collection of Template definitions, these Templates are attached to
 * their immediate {@link NgxErrorsService} instance scoped store or global store.
 *
 * A scope is DOM block which acts as a context container and captures all template definitions
 * defined within it.
 *
 * There are 2 types of context containers (DOM Blocks):
 *
 *   - Template definition defined as DOM content within {@link NgxErrorsComponent}
 *   - Template definition defined within a `ControlContainer`
 *     A `ControlContainer` can be `NgForm`, `NgModelGroup`, `FormGroup` etc... depending on your forms
 *     implementation (Template vs Reactive)
 *
 * > The global store is actually a container as well, its just the root container so it can also
 * be considered as a scope, a basket (catch all) scope.
 *
 * The first hit (from top) defines the container that a template definition belongs to.
 *
 * A Template definition that hit one of the rules above belongs to the scoped collection within
 * it's immediate {@link NgxErrorsService}, otherwise it belongs to the global store.
 *
 * There can only be one template attached to each unique context.
 *
 *   - A Store has **one** unique global context and a unique context for each specific error key defined.
 *   - {@link NgxErrorsComponent} has **one** unique global store and
 *
 * This structure allows fine-grained configuration at the app level, specific form level and when
 * needed at the component level. For both specific errors and globally.
 *
 * An application must have at least one default template attached to the root {@link NgxErrorsService}.
 *
 * Since angular services are also based on hierarchy which is DOM based creating additional
 * providers for {@link NgxErrorsService} (at module level or component level) will create a new
 * hierarchy level with the previous {@link NgxErrorsService} instance as it's parent.
 *
 * > When a global template is not defined within a store the template from the parent is taken.
 * When a specific error key is not defined within a store the key search on the parent (up to the root) and
 * if not found the global template is used.
 */
@Directive({
  selector: '[ngxErrorTemplate]'
})
export class NgxErrorTemplateDirective implements NgxDisplayContext, OnInit, OnDestroy {

  /**
   * @internal
   */
  template: TemplateRef<NgxErrorsContext>;

  /**
   * A predicate that allows filtering out error message right before they are displayed.
   * @param c
   */
  @Input('ngxErrorTemplateRenderIf') renderIf: (c: AbstractControl) => boolean;

  /**
   * Maximum number of errors to display
   */
  @Input('ngxErrorTemplateMaxError') maxError: number;

  /**
   * A list of error keys that defines the order of which errors appear.
   *
   * The list can be partial, following errors will display in the order they were added.
   */
  @Input('ngxErrorTemplateOrder') order: string[];

  /**
   * An error key to bind the template to (e.g. 'required').
   * When not set the template is considered the global (default) template for the scope.
   */
  @Input('ngxErrorTemplateErrorKey') errorKey: string | undefined;

  constructor(template: TemplateRef<NgxErrorsContext>,
              private ngxErrorsService: NgxErrorsService,
              @Optional() private local?: NgxErrorsComponent,
              @Optional() private control?: ControlContainer) {
    this.template = template;
  }

  ngOnInit(): void {
    if (this.local) {
      this.ngxErrorsService.setContext(this, this.local, this.control);
    } else {
      this.ngxErrorsService.setContext(this, this.control);
    }
  }

  /**
   * @internal
   */
  ngOnDestroy(): void {
    this.ngxErrorsService.removeContext(this, this.local || this.control);
  }
}
