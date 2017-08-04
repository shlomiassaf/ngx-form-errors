import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'showcase-home',
  templateUrl: 'showcase-home.component.html',
})
export class ShowcaseHomeComponent {

  renderIf(c: AbstractControl): boolean {
    return c.dirty;
  }
}