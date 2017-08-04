import { Component } from '@angular/core';

import { User, UserRoles } from '../../user';

@Component({
  selector: 'template-driven-form',
  templateUrl: 'template-form.component.html'
})
export class TemplateFormComponent  {
  model: User = new User();
  readonly userRoles = UserRoles;
}