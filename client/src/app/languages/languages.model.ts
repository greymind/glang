export enum LanguageCode {
  English = 'eng',
  Croatian = 'hrv'
}

export interface ILanguage {
  code: LanguageCode;
  name: string;
  gender?: boolean;
  singularForm?: ISingularForm;
  pluralForm?: IPluralForm;
}

export interface ILanguages {
  list: ILanguage[];
}

export interface ISingularForm {
  me: string;
  you: string;
  he: string;
  she: string;
  it?: string;
}

export interface IPluralForm {
  we: string;
  youAll: string;
  heAll: string;
  sheAll: string;
  itAll?: string;
}
