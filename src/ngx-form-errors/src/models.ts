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
  /** @internal */
  template: TemplateRef<NgxErrorsContext>;

  /**
   * A list of error keys that defines the order of which errors appear.
   *
   * The list can be partial, following errors will display in the order they were added.
   */
  order?: string[];

  /**
   * Maximum number of errors to display
   */
  maxError?: number;

  /**
   * A predicate that allows filtering out error message right before they are displayed.
   *
   * Function (and arrow functions) are not allowed in angular template expressions so the predicate
   * should be defined on a component.
   *
   * ```typescript
   * import { Component } from '@angular/core';
   * import { AbstractControl } from '@angular/forms';
   *
   * \ @Component({
   *   selector: 'showcase-home',
   *   templateUrl: 'showcase-home.component.html',
   * })
   * export class ShowcaseHomeComponent {
   *
   *   renderIf(c: AbstractControl): boolean {
   *     return c.dirty;
   *   }
   * }
   *
   * ```
   *
   * ```html
   * <div *ngxErrorTemplate="let item; renderIf: renderIf"  class="form-control-feedback">{{item.message}}</div>
   * ```
   * @param c
   */
  renderIf?: (c: AbstractControl) => boolean;

  /**
   * Bind the template to a specific error key.
   * When not set the context is considered the global (default) template for the scope.
   */
  errorKey?: string | undefined;
}

export class NgxDisplayContextStore {

  get global(): NgxDisplayContext { return this._global; };
  get hash(): any {
    this.syncHash();
    return this._hash;
  };

  private _hash: any = 0;
  private _parentHash: any;
  private _mergedKeys: { [key: string]: NgxDisplayContext };
  private _global: NgxDisplayContext;
  private keyed = new Map<string, NgxDisplayContext>();

  constructor(private parent?: NgxDisplayContextStore) {}

  add(ctx: NgxDisplayContext): void {
    if (ctx.errorKey) {
      this.reHash();
      this.keyed.set(ctx.errorKey, ctx);
    } else {
      this._global = ctx;
    }
  }

  hasAny(): boolean {
    return this.hasGlobal() || this.keyed.size > 0 || (this.parent && this.parent.hasAny());
  }

  hasGlobal(): boolean {
    return !!this._global || (this.parent && this.parent.hasGlobal());
  }

  has(key: string): boolean {
    return this.keyed.has(key) || (this.parent && this.parent.has(key));
  }

  /**
   * Returns the global NgxDisplayContext
   */
  get(): NgxDisplayContext | undefined;
  /**
   * Returns an error specific context. If none found will NOT fallback to the global context.
   * @param key
   * @param defaultToGlobal
   */
  get(key: string, defaultToGlobal: false): NgxDisplayContext | undefined;
  /**
   * Returns an error specific context. If none found will fallback to the global context.
   * @param key
   */
  get(key: string): NgxDisplayContext | undefined;
  get(key?: string, defaultToGlobal?: boolean): NgxDisplayContext | undefined {
    if (!key) {
      return this._global || (this.parent && this.parent.get());
    }
    return this.keyed.get(key)
      || (this.parent && this.parent.get(key, false))
      || (defaultToGlobal !== false && this.get());
  }

  mergedKeys(): { [key: string]: NgxDisplayContext } {
    this.syncHash();
    if (!this._mergedKeys) {
      const keyedAsObject = Array.from(this.keyed.entries()).reduce( (obj, [k, v]) => {
        obj[k] = v;
        return obj;
      }, {});

      if (this.parent) {
        this._mergedKeys = Object.assign(this.parent.mergedKeys(), keyedAsObject);
      } else {
        this._mergedKeys =  keyedAsObject;
      }
    }
    return this._mergedKeys;
  }

  remove(key?: string): boolean {
    if (key && this.keyed.has(key)) {
      this.reHash();
      return this.keyed.delete(key);
    } else if (this._global) {
      this._global = undefined;
      return true;
    }
    return false;
  }

  clone(parent?: NgxDisplayContextStore): NgxDisplayContextStore {
    const store = new NgxDisplayContextStore(parent);
    store._global = this._global;
    store.keyed = new Map<string, NgxDisplayContext>(this.keyed.entries());
    return store;
  }

  private reHash(): void {
    this._mergedKeys = undefined;
    this._hash += 1;
  }

  private syncHash(): void {
    if (this.parent) {
      const pHash = this.parent.hash;
      if (pHash !== this._parentHash) {
        this._parentHash = pHash;
        this.reHash();
      }
    }
  }
}
