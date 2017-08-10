# ngx-form-errors

UI Agnostic, `@angular/forms` error rendering management utility.


  - Does not enforce UI, elements, structure or styles. Just renders.
  - Supports **Template-Driven Forms** and **Reactive Forms**
  - i18n ready architecture
  - Default error message
  - Customizable
  - Cascading configuration

## Install
```bash
npm install ngx-form-errors
```

## Quick start

**In your application root module definition add `NgxFormErrorsModule`:**

```ts
import { NgxFormErrorsModule } from 'ngx-form-errors';

// lots of code...

@NgModule({
  bootstrap: [ /* ... */ ],
  declarations: [ /* ... */ ],
  imports: [
    /* ... */
    NgxFormErrorsModule.forRoot()
  ],
})
export class AppModule { /* lots of code... */ }
```

**You can also set default error messages:**

```ts
import { NgxFormErrorsModule, NgxErrorsService } from 'ngx-form-errors';

@NgModule({
  /* bla bla yada yada */
})
export class AppModule {
  constructor(ngxErrorsService: NgxErrorsService) {
    ngxErrors.setDefaultMessage('required', 'This field is required');
  }
}
```

> Default error messages are only used when error returns `true` instead of a string.
An example is the built in `required` validator.

**Create a global error template in the template of the application's root component:**

Bootstrap example:
```html
<div *ngxErrorTemplate="let item" class="form-control-feedback">{{item.message}}</div>

<!-- COMPONENT TEMPLATE HERE... -->
```

Material example:
```html
<md-error *ngxErrorTemplate="let item">{{item.message}}</md-error>

<!-- COMPONENT TEMPLATE HERE... -->
```

This template contains the instructions for how to render an error.
You can supply any template, the library does not care.

**Now, in your forms set error components and attach them to controls:**

Template Driven example:
```html
<form #form="ngForm">
  <div class="form-group row" [class.has-danger]="form.control.get('name')?.invalid">
      <label class="col-sm-2 form-control-label" for="name">Name</label>
      <div class="col-sm-10">
          <input type="text" class="form-control" name="name" id="name" ngModel #name="ngModel" required>
          <div ngxErrors="name"></div>
      </div>
  </div>
</form>
```

Reactive example:
```html
<form [formGroup]="userForm">
  <div class="form-group row" [class.has-danger]="userForm.get('name').invalid">
      <label class="col-sm-2 form-control-label" for="name">Name</label>
      <div class="col-sm-10">
          <input type="text" id="name" class="form-control" formControlName="name" />
          <div ngxErrors="name"></div>
      </div>
  </div>
</form>
```

Reactive example with material design:
```html
<form [formGroup]="userForm">
  <div class="form-group row" [class.has-danger]="userForm.get('name').invalid">
      <label class="col-sm-2 form-control-label" for="name">Name</label>
      <div class="col-sm-10">
          <input type="text" id="name" class="form-control" formControlName="name" />
          <md-error ngxErrors="name"></md-error>
      </div>
  </div>
</form>
```

> In material, the presence of `md-error` is important, it must exists next to the control.
This is why `<md-error ngxErrors="name"></md-error>` is used, however the actual rendered errors
are based on the template!

## Advanced features:
**Configuration:**
Error templates comes with a declarative API to customise the behaviour.
Things like maximum errors to display, the order of display, render predicate and more...
These are all sugar helpers and can be done manually within your templates.
Read more in the documentation...

**Multiple error template:**
Supplying one template is enough for most use cases.
However, some scenarios requires custom templates.
**ngx-form-errors** support multiple templates using hierarchy.

A template can be set per:
  - NgModule
  - Component
  - NgForm
  - Error component content

When the library looks up for a template to use, the closest template to the element is selected (bottom first in the list).
The hierarchy is managed via DOM structure (Error component content & NgForm) and angular's DI for Component & NgModule.
Read more in the documentation for `NgxErrorTemplateDirective`

## Examples:
Take a look at the demo app where you can find <a href="https://github.com/shlomiassaf/ngx-form-errors/tree/master/src/demo/app/showcase/containers/by-feature" target="_blank">examples by feature</a>, <a href="https://github.com/shlomiassaf/ngx-form-errors/tree/master/src/demo/app/showcase/containers/reactive-form" target="_blank">Reactive Forms example</a> and a <a href="https://github.com/shlomiassaf/ngx-form-errors/tree/master/src/demo/app/showcase/containers/template-form" target="_blank">Template Driven forms example</a>

## Why
Rendering `@angular/forms` errors is usually a simple task but one that
repeats itself over and over.

When things spice up, any they always do, it gets more verbose:
A control with multiple validators requires an error component for each
validator so the error (if exists) coming from a validator will display.

A Form with 3 fields, each with 3 validators required **9** components!

And we're not done, rendering an error is usually done under some
restrictions (conditions), most likely based on the control state (dirty, touched, etc)
this adds more declarative template code.
