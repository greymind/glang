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
