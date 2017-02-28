import {NgModule} from '@angular/core';
import {Store, combineReducers} from '@ngrx/store';
import {EffectsSubscription} from '@ngrx/effects';

@NgModule({})
export class ReducerManager {
  private reducers: any = {};

  constructor(private store: Store<any>, private sub: EffectsSubscription) {}

  addReducer(name: string, reducers: {[n:string]: any}) {
    this.reducers[name] = reducers;
    this.store.replaceReducer(combineReducers(this.reducers));
  }

  addEffects(effects: any) {
    this.sub.addEffects([this.sub]);
  }
}