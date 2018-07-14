import { NgModule } from '@angular/core';
import { compose, applyMiddleware, Action } from 'redux';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';
import persistState from 'redux-localstorage';

import { IAppState } from './model';
import { rootReducer } from './reducers';
import { RootEpics } from './epics';
import { createEpicMiddleware } from 'redux-observable';

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

    const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, IAppState>();

    store.configureStore(
      rootReducer,
      {},
      [epicMiddleware],
      storeEnhancers
    );

    epicMiddleware.run(rootEpics.createEpics());

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }

    provideReduxForms(store);
  }
}
