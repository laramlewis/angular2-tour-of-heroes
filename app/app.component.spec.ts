/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';
import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  inject, injectAsync, fakeAsync, TestComponentBuilder, tick
} from 'angular2/testing';

import { provide, ViewMetadata, ApplicationRef }   from 'angular2/core';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { ROUTER_PROVIDERS, APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT  } from 'angular2/router';
import { MockApplicationRef } from 'angular2/src/mock/mock_application_ref';

/////////// Module Preparation ///////////////////////
interface Done {
  (): void;
  fail: (err: any) => void;
}

////////  SPECS  /////////////

/// Delete this: verify can use Angular testing's DOM abstraction to access DOM
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});


describe('AppComponent', () => {

  beforeEachProviders(() => [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: AppComponent }),
    provide(ApplicationRef, { useClass: MockApplicationRef }),
  ]);

  it('should be able to test',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      return tcb.createAsync(AppComponent).then((fixture) => {
        fixture.detectChanges();
        expect(true).toBe(true);
      });
    }));

  it('should instantiate component',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      return tcb.createAsync(AppComponent).then(fixture => {
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
      });
    }));

  it('should have expected <h1> text',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      return tcb.createAsync(AppComponent).then(fixture => {
        fixture.detectChanges();  // need for a binding; we don't have one
        let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;
        expect(h1.innerText).toMatch(/tour of heroes/i, '<h1> should say something about "Tour of Heroes"');
      });
    }));
});
