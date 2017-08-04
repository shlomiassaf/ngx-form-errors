import { Routes } from '@angular/router';

import {
  ShowcaseHomeComponent,
  BasicFormComponent,
  TemplateFormComponent,
  ReactiveFormComponent,
  AdvancedFormComponent
} from './containers';

export const ROUTES: Routes = [
  { path: '', component: ShowcaseHomeComponent, children: [
    { path: 'basic-form',     component: BasicFormComponent },
    { path: 'template-form',  component: TemplateFormComponent },
    { path: 'reactive-form',  component: ReactiveFormComponent },
    { path: 'advanced-form',  component: AdvancedFormComponent }
  ]}
];
