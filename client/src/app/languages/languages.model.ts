export enum LanguageCode {
  English = 'eng',
  Croatian = 'hrv'
}

export interface ILanguage {
  code: LanguageCode;
  name: string;
}

export interface ILanguages {
  list: ILanguage[];
}
