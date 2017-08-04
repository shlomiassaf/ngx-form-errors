import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'basic-template-driven-form',
  templateUrl: 'basic-form.component.html'
})
export class BasicFormComponent implements OnInit {
  form: any;
  powers: string[];
  submitted: boolean = false;


  ngOnInit() {
    this.powers = ['Really Smart', 'Turbulent Breeze',
      'Super Hot', 'Weather Changer'];
  }

  onSubmit(form: any)  {
    this.submitted = true;
    this.form = form;
  }
}