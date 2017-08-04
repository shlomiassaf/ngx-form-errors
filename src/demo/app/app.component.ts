/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `    
      <nav>
        <a [routerLink]=" ['./'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Index
        </a>
        <a [routerLink]=" ['./showcase'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Showcase
        </a>
      </nav>
  
      <main>
        <router-outlet></router-outlet>
      </main>
  `
})
export class AppComponent {

}
