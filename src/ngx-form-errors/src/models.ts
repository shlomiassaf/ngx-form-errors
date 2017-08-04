import { TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface ErrorItem {
  name: string;
  message: string;
}

export interface NgxErrorsContext {
  $implicit: ErrorItem;
}

export interface NgxDisplayContext {
  template: TemplateRef<NgxErrorsContext>;
  order?: string[];
  maxError?: number;
  renderIf?: (c: AbstractControl) => boolean;
}