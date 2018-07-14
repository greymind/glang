export enum LanguageCode {
  English = 'eng',
  Croatian = 'hrv'
}

export interface ILanguage {
  code: LanguageCode;
  name: string;
  gender?: boolean;
}

export interface ILanguages {
  list: ILanguage[];
}
