import { LanguageCode, ILanguages } from '../languages/languages.model';
import { Action } from 'redux';

const InitialState: ILanguages = {
  list: [
    { code: LanguageCode.English, name: 'English' },
    {
      code: LanguageCode.Croatian,
      name: 'Croatian',
      gender: true,
      singularForm: {
        me: 'ja', you: 'ti', he: 'on', she: 'ona', it: 'ono'
      },
      pluralForm: {
        we: 'mi', youAll: 'vi/Vi', heAll: 'oni', sheAll: 'one', itAll: 'ona'
      }
    }
  ],
};

export function languagesReducer(state: ILanguages = InitialState, action: Action): ILanguages {
  return state;
}
