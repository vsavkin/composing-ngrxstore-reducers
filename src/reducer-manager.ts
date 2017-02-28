import {Injectable} from '@angular/core';
import {Store, combineReducers} from '@ngrx/store';
import {EffectsSubscription} from '@ngrx/effects';

@Injectable()
export class ReducerManager {
  private reducers: any = {};

  constructor(private store: Store<any>, private sub: EffectsSubscription) {}

  addReducer(name: string, reducers: Function|{[n:string]: any}, effects: any[]) {
    if (this.reducers[name] === undefined) {
      this.reducers[name] = reducers;
      this.store.replaceReducer(combineReducers(this.reducers));
      this.sub.addEffects(effects);
    }
  }
}