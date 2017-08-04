import { ShowcaseHomeComponent, BasicFormComponent, TemplateFormComponent, ReactiveFormComponent, AdvancedFormComponent } from './containers';
export var ROUTES = [
    { path: '', component: ShowcaseHomeComponent, children: [
            { path: 'basic-form', component: BasicFormComponent },
            { path: 'template-form', component: TemplateFormComponent },
            { path: 'reactive-form', component: ReactiveFormComponent },
            { path: 'advanced-form', component: AdvancedFormComponent }
        ] }
];
//# sourceMappingURL=showcase.routes.js.map