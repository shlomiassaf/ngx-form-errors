import { Component, Inject, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShowcaseHomeComponent } from '../showcase-home/showcase-home.component';
import { User, UserRoles } from '../../user';

@Component({
  selector: 'template-driven-form',
  templateUrl: 'template-form.component.html'
})
export class TemplateFormComponent implements AfterViewInit {
  model: User = new User();
  readonly userRoles = UserRoles;

  @ViewChild(NgForm) ngForm: NgForm;

  constructor(@Inject(forwardRef(() => ShowcaseHomeComponent)) public parent: ShowcaseHomeComponent) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.parent.currentForm = this.ngForm.form, 16);
  }
}