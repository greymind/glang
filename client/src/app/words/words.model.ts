import { Gender, WordClass } from '../core/core.model';
import { LanguageCode } from '../languages/languages.model';

export interface IWord {
  id?: number;
  text: string;
  languageCode: LanguageCode;
  plural?: string;
  gender?: Gender;
  class?: WordClass;
}

export interface IWords {
  form: IWord;
  list: IWord[];
  lastWordId: number;
}
