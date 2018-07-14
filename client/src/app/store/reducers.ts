import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';

import { languagesReducer } from '../languages/languages.reducer';
import { wordsReducer } from '../words/words.reducer';
import { cardsReducer } from '../cards/cards.reducer';

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    languages: languagesReducer,
    words: wordsReducer,
    cards: cardsReducer,
    router: routerReducer,
  })
);
