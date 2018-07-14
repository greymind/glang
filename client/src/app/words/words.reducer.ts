import { IWord, LanguageCode, Gender } from '../store/model';
import { Action } from 'redux';

const InitialState = [{
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
}];

export function wordsReducer(state: IWord[] = InitialState, action: Action) {
  return state;
}
