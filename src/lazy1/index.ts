import { ComponentRef, ElementRef, NgModule, Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReducerManager } from '../reducer-manager';

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

export class Child1Effects {}

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyCmp }
    ])
  ],
  declarations: [LazyCmp]
})
export class Lazy1Module {
  constructor(reducerManager: ReducerManager) {
    reducerManager.addReducer('child1', child1Reducer);
    reducerManager.addEffects(Child1Effects);
  }
}