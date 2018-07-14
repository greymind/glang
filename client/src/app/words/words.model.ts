import { LanguageCode, Gender } from '../core/core.model';

export interface IWord {
  id: number;
  text: string;
  languageCode: LanguageCode;
  plural: string;
  gender: Gender;
}

export interface IWords {
  form: any;
  words: IWord[];
}
