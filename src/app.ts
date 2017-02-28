import {NgModule, Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule, Store} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ReducerManager} from './reducer-manager';

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
  template: `eager`
})
export class EagerCmp {}

export function rootReducer() {
  return "root-state";
}

export class RootEffects {}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'eager', component: EagerCmp},
      { path: 'lazy1', loadChildren: './lazy1/index#Lazy1Module' },
      { path: 'lazy2', loadChildren: './lazy2/index#Lazy2Module' }
    ]),
    StoreModule.provideStore({}),
    EffectsModule.run(RootEffects),
    ReducerManager
  ],
  bootstrap: [RootCmp],
  declarations: [EagerCmp, RootCmp]
})
export class AppModule {
  constructor(store: Store<any>, reducerManager: ReducerManager) {
    store.subscribe((e) => {
      console.log("store", e);
    });
    reducerManager.addReducer('root', rootReducer);
  }
}