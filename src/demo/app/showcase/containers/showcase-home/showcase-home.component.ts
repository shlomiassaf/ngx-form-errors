import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { BasicFormComponent } from '../basic-form/basic-form.component';
import { TemplateFormComponent } from '../template-form/template-form.component';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { BY_FEATURE_COMPONENTS } from '../by-feature';

@Component({
  selector: 'showcase-home',
  templateUrl: 'showcase-home.component.html',
})
export class ShowcaseHomeComponent {

  selectedExample: any;

  currentForm: any;

  readonly examplesByFormsModule = [
    {
      name: 'Basic Template Driven Form',
      component: BasicFormComponent
    },
    {
      name: 'Template Driven Form',
      component: TemplateFormComponent
    },
    {
      name: 'Reactive Form',
      component: ReactiveFormComponent
    }
  ];

  readonly examplesByFeature = BY_FEATURE_COMPONENTS.map( component => ({
    name: component.NAV_META.title,
    component
  }));

  renderIf(c: AbstractControl): boolean {
    return c.dirty;
  }

}