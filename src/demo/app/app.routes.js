import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
export var ROUTES = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'showcase', loadChildren: './showcase#ShowcaseModule' },
    { path: '**', component: NoContentComponent },
];
//# sourceMappingURL=app.routes.js.map