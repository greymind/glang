import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { wordsReducer } from '../words/words.reducer';
import { cardsReducer } from '../cards/cards.reducer';

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    words: wordsReducer,
    cards: cardsReducer,
    router: routerReducer,
  })
);
