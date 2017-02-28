import { Injectable, ComponentRef, ElementRef, NgModule, Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReducerManager } from '../reducer-manager';
import {EffectsModule, Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'lazy2',
  template: `
    lazy2
  `
})
export class LazyCmp  {
}

export function child2Reducer() {
  return 'child2-state';
}


@Injectable()
export class Child2Effects {
  constructor(private actions$: Actions) { }

   @Effect() testRoot$ = this.actions$.ofType("TEST").mergeMap((e) => {
    console.log("child2 effects", e);
    return of();
   });
}

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyCmp }
    ])
  ],
  providers: [Child2Effects],
  declarations: [LazyCmp]
})
export class Lazy2Module {
  constructor(reducerManager: ReducerManager, e: Child2Effects) {
    reducerManager.addReducer('child2', child2Reducer, [e]);
  }
}