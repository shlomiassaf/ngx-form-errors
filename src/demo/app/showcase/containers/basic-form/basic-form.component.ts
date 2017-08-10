import { Component, OnInit, Inject, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShowcaseHomeComponent } from '../showcase-home/showcase-home.component';

@Component({
  selector: 'basic-template-driven-form',
  templateUrl: 'basic-form.component.html'
})
export class BasicFormComponent implements OnInit, AfterViewInit {
  form: any;
  powers: string[];
  submitted: boolean = false;

  @ViewChild(NgForm) ngForm: NgForm;

  constructor(@Inject(forwardRef(() => ShowcaseHomeComponent)) public parent: ShowcaseHomeComponent) {

  }

  ngOnInit() {
    this.powers = ['Really Smart', 'Turbulent Breeze',
      'Super Hot', 'Weather Changer'];
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.parent.currentForm = this.ngForm.form, 16);
  }
}
