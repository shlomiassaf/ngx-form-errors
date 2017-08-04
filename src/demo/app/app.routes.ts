import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'showcase', loadChildren: './showcase#ShowcaseModule'},
  { path: '**',    component: NoContentComponent },
];
