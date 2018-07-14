import { LanguageCode, ILanguages } from '../languages/languages.model';
import { Action } from 'redux';

const InitialState: ILanguages = {
  list: [
    { code: LanguageCode.English, name: 'English' },
    { code: LanguageCode.Croatian, name: 'Croatian', gender: true }
  ],
};

export function languagesReducer(state: ILanguages = InitialState, action: Action): ILanguages {
  return state;
}
