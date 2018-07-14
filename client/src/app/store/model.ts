export enum LanguageCode {
  English = 'eng',
  Croatian = 'hrv'
}

export interface ILanguage {
  code: LanguageCode;
  name: string;
}

export enum Gender {
  None = 1,
  Male = 2,
  Female = 3,
  Neutral = 4
}

export interface IWord {
  id: number;
  text: string;
  languageCode: LanguageCode;
  plural: string;
  gender: Gender;
}

export interface ICard {
  frontWordId: number;
  backWordId: number;
}

export interface IAppState {
  languages?: ILanguage[];
  words?: IWord[];
  cards?: ICard[];
  count?: number;
  router?: string;
}
