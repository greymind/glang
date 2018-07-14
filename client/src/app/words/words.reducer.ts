import { IWords, IWord, IWordViewModel } from './words.model';
import { Gender } from '../core/core.model';
import { WordsAction, WordsActions } from './words.actions';
import { LanguageCode } from '../languages/languages.model';
import { FORM_CHANGED } from '@angular-redux/form';
import * as R from 'ramda';

const InitialState: IWords = {
  form: {
    word: {
      text: '',
      languageCode: LanguageCode.English
    },
    autoGender: false,
  },
  list: [{
    id: 0,
    languageCode: LanguageCode.Croatian,
    gender: Gender.Male,
    text: 'krumpir',
    plural: 'krumpiri'
  }, {
    id: 1,
    languageCode: LanguageCode.English,
    gender: Gender.None,
    text: 'potato',
    plural: 'potatoes'
  }],
  lastWordId: 1,
};

export function wordsReducer(state: IWords = InitialState, action: WordsAction): IWords {
  switch (action.type) {
    case WordsActions.AddWord:
      return {
        ...state,
        form: {
          word: {
            text: '',
            languageCode: state.form.word.languageCode
          },
          autoGender: false
        },
        list: [
          ...state.list,
          { ...action.payload.word, id: state.lastWordId + 1 }
        ],
        lastWordId: state.lastWordId + 1
      };
    case FORM_CHANGED:
      const payload = action.payload as any;
      const path = payload.path;
      const word = payload.value as IWord;
      const autoGender = state.form.autoGender;
      const lastGender = state.form.lastGender;
      const didUserChangeGender = word.gender !== lastGender;

      if (R.equals(path, ['words', 'form', 'word'])
        && !didUserChangeGender
        && !R.isEmpty(word.text)
        && word.languageCode === LanguageCode.Croatian
        && (R.isNil(word.gender) || autoGender)) {
        const text = word.text;

        console.log(word, didUserChangeGender);

        const isFemale = R.endsWith('a', text);
        const isNeutral = R.endsWith('o', text) || R.endsWith('e', text);
        const gender = isFemale
          ? Gender.Female
          : isNeutral
            ? Gender.Neutral
            : Gender.Male;

        return {
          ...state,
          form: {
            ...state.form,
            word: {
              ...state.form.word,
              gender
            },
            autoGender: true,
            lastGender: gender
          },
        };
      } else {
        return {
          ...state,
          form: {
            ...state.form,
            autoGender: false,
          }
        };
      }
  }

  return state;
}
