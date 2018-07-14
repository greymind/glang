import { Action } from 'redux';
import { IWords } from './words.model';
import { LanguageCode, Gender } from '../core/core.model';

const InitialState = {
  form: {},
  words: [{
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
  }]
};

export function wordsReducer(state: IWords = InitialState, action: Action) {
  return state;
}
