import { ComponentRef, ElementRef, NgModule, Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReducerManager } from '../reducer-manager';

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

export class Child2Effects {}

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyCmp }
    ])
  ],
  declarations: [LazyCmp]
})
export class Lazy2Module {
  constructor(reducerManager: ReducerManager) {
    reducerManager.addReducer('child2', child2Reducer);
    reducerManager.addEffects(Child2Effects);
  }
}