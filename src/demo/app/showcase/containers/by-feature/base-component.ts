import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxErrorsService } from 'ngx-form-errors';

import * as validators from '../../validators';
import { ShowcaseHomeComponent } from '../showcase-home/showcase-home.component';

const createGroup = formBuilder => formBuilder.group({
  name:         ['', [
    Validators.required,
    c => ({ alwaysFail1: true }),
    c => ({ alwaysFail2: true }),
    c => ({ alwaysFail3: true }),
    c => ({ alwaysFail4: true })
  ]],
  password:         ['', [
    Validators.required,
    validators.passwordValidator,
    c => ({ alwaysFail1: true }),
    c => ({ alwaysFail2: true }),
    c => ({ alwaysFail3: true }),
    c => ({ alwaysFail4: true })
  ]],
});

export class BaseComponent {
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              ngxErrorsService: NgxErrorsService,
              protected parent?: ShowcaseHomeComponent) {
    this.form = createGroup(this.formBuilder);

    ngxErrorsService.setDefaultMessage('alwaysFail1', 'Constant Error # 1');
    ngxErrorsService.setDefaultMessage('alwaysFail2', 'Constant Error # 2');
    ngxErrorsService.setDefaultMessage('alwaysFail3', 'Constant Error # 3');
    ngxErrorsService.setDefaultMessage('alwaysFail4', 'Constant Error # 4');
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.parent && (this.parent.currentForm = this.form), 16);
  }
}
