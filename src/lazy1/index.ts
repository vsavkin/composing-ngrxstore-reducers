import { Injectable, ComponentRef, ElementRef, NgModule, Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReducerManager } from '../reducer-manager';
import {EffectsModule, Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'lazy1',
  template: `
    lazy1
  `
})
export class LazyCmp  {
}

export function child1Reducer() {
  return 'child1-state';
}

@Injectable()
export class Child1Effects {
  constructor(private actions$: Actions) { }

   @Effect() testRoot$ = this.actions$.ofType("TEST").mergeMap((e) => {
    console.log("child1 effects", e);
    return of();
   });
}

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyCmp }
    ])
  ],
  providers: [Child1Effects],
  declarations: [LazyCmp]
})
export class Lazy1Module {
  constructor(reducerManager: ReducerManager, e: Child1Effects) {
    reducerManager.addReducer('child1', child1Reducer, [e]);
  }
}