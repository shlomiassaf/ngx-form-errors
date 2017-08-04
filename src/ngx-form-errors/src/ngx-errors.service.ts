import { Injectable, Provider, SkipSelf, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { NgxDisplayContext } from './models';

@Injectable()
export class NgxErrorsService {
  defaultScope: NgxDisplayContext;

  protected defaultMsgs: { [name: string]: string } = {};
  protected scopes = new Map<ControlContainer, NgxDisplayContext>();

  getScope(scope?: ControlContainer, alt?: NgxDisplayContext): NgxDisplayContext {
    return (scope && this.scopes.get(scope)) || alt || this.defaultScope;
  }

  setScoped(scope: ControlContainer, context: NgxDisplayContext): void {
    this.scopes.set(scope, context);
  }

  removeScoped(scope: ControlContainer): boolean {
    return this.scopes.delete(scope);
  }

  setDefaultMessage(name: string, message: string): void {
    this.defaultMsgs[name] = message;
  }

  getDefaultMessage(name: string): string | undefined {
    return this.defaultMsgs[name];
  }

  static clone(base: NgxErrorsService): NgxErrorsService {
    const ngxErrorsService = new NgxErrorsService();
    if (base) {
      Object.assign(ngxErrorsService.defaultMsgs, base.defaultMsgs);
      ngxErrorsService.defaultScope = base.defaultScope;
      ngxErrorsService.scopes = new Map(base.scopes.entries());
    }
    return ngxErrorsService;
  }
}

/**
 * @internal
 */
@Injectable()
export class NgxErrorsServiceContainer {
  constructor(@SkipSelf() @Optional() public ngxErrorsService: NgxErrorsService) { }
}

export function containerFactory(c: NgxErrorsServiceContainer) {
  return NgxErrorsService.clone(c.ngxErrorsService);
}

/**
 * A Provider array that will instruct the DI to inject a new instance of NgxErrorsService based
 * on the first instance of NgxErrorsService that exist up the DI tree.
 *
 * If instance does not exist will create an instance of NgxErrorsService based on nothing.
 */
export const NGX_ERRORS_SERVICE_CHILD_PROVIDERS: Provider[] = [
  NgxErrorsServiceContainer,
  {
    provide: NgxErrorsService,
    useFactory: containerFactory,
    deps: [ NgxErrorsServiceContainer ]
  }
];
