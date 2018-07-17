import { IWords, IWord, IWordViewModel, IFormTable } from './words.model';
import { Gender } from '../core/core.model';
import { WordsAction, WordsActions } from './words.actions';
import { LanguageCode } from '../languages/languages.model';
import { FORM_CHANGED } from '@angular-redux/form';
import * as R from 'ramda';
import { findWord, determineGender } from './words.helpers';

const InitialState: IWords = {
  list: [{
    id: 0,
    languageCode: LanguageCode.Croatian,
    gender: Gender.Male,
    text: 'krumpir',
    plural: 'krumpiri'
  }, {
    id: 1,
    languageCode: LanguageCode.English,
    text: 'potato',
    plural: 'potatoes'
  }],
  lastWordId: 1
};

export function wordsReducer(state: IWords = InitialState, action: WordsAction): IWords {
  switch (action.type) {
    case WordsActions.AddWord:
      const newWord = action.payload.word;

      const duplicateWord = findWord(state.list, newWord.text, newWord.languageCode);

      if (!R.isNil(duplicateWord)) {
        console.warn('Word already exists!');
        return state;
      }

      const newLastWordId = state.lastWordId + 1;
      newWord.id = newLastWordId;

      if (newWord.languageCode === LanguageCode.Croatian
        && R.isNil(newWord.gender)) {
        newWord.gender = determineGender(newWord.text, newWord.languageCode);
      }

      return {
        ...state,
        list: [
          ...state.list,
          newWord
        ],
        lastWordId: newLastWordId
      };

    case WordsActions.UpdateWord:
      return {
        ...state,
        list: [
          ...state.list.filter(w => w.id !== action.payload.word.id),
          action.payload.word
        ]
      };

    case WordsActions.DeleteWord:
      return {
        ...state,
        list: [
          ...state.list.filter(w => w.id !== action.payload.word.id)
        ]
      };
  }

  return state;
}
