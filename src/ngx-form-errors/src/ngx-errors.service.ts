import { Injectable, Provider, SkipSelf, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { NgxDisplayContext, NgxDisplayContextStore } from './models';
import { NgxErrorsComponent } from  './ngx-errors.component';

export type ContextScope = ControlContainer | NgxErrorsComponent;

@Injectable()
export class NgxErrorsService {
  /**
   * @internal
   */
  defaultContext = new NgxDisplayContextStore();

  /**
   * @internal
   */
  protected defaultMsgs: { [name: string]: string } = {};

  /**
   * @internal
   */
  protected scopes = new Map<ContextScope, NgxDisplayContextStore>();

  /**
   * @internal
   */
  getContextStore(scope: ContextScope, alt?: ContextScope): NgxDisplayContextStore {
    return (scope && this.scopes.get(scope)) || (alt && this.scopes.get(alt)) || this.defaultContext;
  }

  /**
   * @internal
   */
  getContext(scope: ContextScope, alt?: ContextScope): NgxDisplayContext;
  getContext(errorKey: string, alt?: ContextScope): NgxDisplayContext;
  getContext(errorKey: string, scope: ContextScope, alt?: ContextScope): NgxDisplayContext;
  getContext(errorKey?: string | ContextScope,
             scope?: ContextScope,
             alt?: ContextScope): NgxDisplayContext {
    if (errorKey && typeof errorKey !== 'string') {
      if (scope) {
        alt = <any> scope;
      }
      scope = errorKey;
    }

    const store = this.getContextStore(scope, alt) || this.defaultContext;
    return store.get(errorKey as string);
  }

  /**
   * @internal
   */
  setContext(context: NgxDisplayContext, scope?: ContextScope, parent?: ContextScope): void {
    if (scope) {
      let store = this.scopes.get(scope);
      if (!store) {
        const parentStore = (parent && this.getContextStore(parent)) || this.defaultContext;
        this.scopes.set(scope, store = new NgxDisplayContextStore(parentStore));
      }
      store.add(context);
    } else {
      this.defaultContext.add(context);
    }
  }

  /**
   * @internal
   */
  removeScope(scope: ContextScope): boolean {
    return this.scopes.delete(scope);
  }

  /**
   * @internal
   */
  removeContext(context: NgxDisplayContext, scope?: ContextScope): boolean {
    let result: boolean = false;

    if (scope) {
      const store = this.scopes.get(scope);
      if (store) {
        result = store.remove(context.errorKey);
      }
      if (!store.hasAny()) {
        this.scopes.delete(scope);
      }
    } else {
      result = this.defaultContext.remove(context.errorKey);
    }

    return result;
  }

  /**
   * Set a default message for a validator.
   *
   * @param name
   * @param message
   */
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
      ngxErrorsService.defaultContext = base.defaultContext.clone(base.defaultContext);
      Array.from(base.scopes.entries())
        .forEach( ([k, v]) => ngxErrorsService.scopes.set(k, v.clone(base.defaultContext) ));
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
