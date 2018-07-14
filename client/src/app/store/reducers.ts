import { combineReducers, Action } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { IAppState } from './model';
import { CounterActions } from '../actions';
import { wordsReducer } from '../words/words.reducer';
import { cardsReducer } from '../cards/cards.reducer';

function appReducer(lastState: IAppState, action: Action): IAppState {
  switch (action.type) {
    case CounterActions.INCREMENT: return { ...lastState, count: lastState.count + 1 };
    case CounterActions.DECREMENT: return { ...lastState, count: lastState.count - 1 };
  }
  return lastState;
}

export const rootReducer = composeReducers(
  defaultFormReducer(),
  appReducer,
  combineReducers({
    words: wordsReducer,
    cards: cardsReducer,
    router: routerReducer,
  })
);
