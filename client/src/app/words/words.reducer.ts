import { IWords } from './words.model';
import { Gender } from '../core/core.model';
import { WordsAction, WordsActions } from './words.actions';
import { LanguageCode } from '../languages/languages.model';

const InitialState: IWords = {
  form: {
    text: '',
    languageCode: LanguageCode.English
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
          text: '',
          languageCode: state.form.languageCode
        },
        list: [
          ...state.list,
          { ...action.payload, id: state.lastWordId + 1 }
        ],
        lastWordId: state.lastWordId + 1
      };
  }

  return state;
}
