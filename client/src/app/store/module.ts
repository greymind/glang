import { NgModule } from '@angular/core';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';
import persistState from 'redux-localstorage';

import { IAppState } from './model';
import { rootReducer } from './reducers';
import { RootEpics } from './epics';

@NgModule({
  imports: [NgReduxModule, NgReduxRouterModule],
  providers: [RootEpics],
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpics,
  ) {
    let storeEnhancers = [];

    const persist = false;
    if (persist) {
      storeEnhancers = storeEnhancers.concat(persistState());
    }

    if (devTools.isEnabled) {
      storeEnhancers = storeEnhancers.concat(devTools.enhancer());
    }

    store.configureStore(
      rootReducer,
      {},
      [...rootEpics.createEpics()],
      storeEnhancers
    );

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }

    provideReduxForms(store);
  }
}
