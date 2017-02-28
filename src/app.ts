import {NgModule, Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule, Store} from '@ngrx/store';
import {EffectsModule, Actions, Effect} from '@ngrx/effects';
import {ReducerManager} from './reducer-manager';
import 'rxjs/add/operator/mergeMap';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'root-cmp',
  template: `
    Parent:
    <button routerLink="eager">Regular</button>
    <button routerLink="lazy1">Lazy1</button>
    <button routerLink="lazy2">Lazy2</button>

    <hr>
    <router-outlet></router-outlet>
  `,
})
export class RootCmp {}

@Component({
  selector: 'eager-cmp',
  template: `eager <button (click)="action()">Action</button>`
})
export class EagerCmp {
  constructor(private store: Store<any>) {}

  action() {
    this.store.dispatch({
      type: 'TEST',
      payload: 'root'
    });
  }
}

export function rootReducer() {
  return "root-state";
}

export class RootEffects {
  constructor(private actions$: Actions) { }

   @Effect() testRoot$ = this.actions$.ofType("TEST").mergeMap((e) => {
    console.log("root effects", e);
    return of();
   });
}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'eager', component: EagerCmp},
      { path: 'lazy1', loadChildren: './lazy1/index#Lazy1Module' },
      { path: 'lazy2', loadChildren: './lazy2/index#Lazy2Module' }
    ]),
    StoreModule.provideStore({}),
    EffectsModule.run(RootEffects)
  ],
  bootstrap: [RootCmp],
  declarations: [EagerCmp, RootCmp],
  providers: [
    ReducerManager
  ]
})
export class AppModule {
  constructor(store: Store<any>, reducerManager: ReducerManager) {
    store.subscribe((e) => {
      console.log("store", e);
    });
    reducerManager.addReducer('root', rootReducer, []);
  }
}