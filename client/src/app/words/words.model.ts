import { Gender, WordClass } from '../core/core.model';
import { LanguageCode } from '../languages/languages.model';

export interface IWord {
  id?: number;
  text?: string;
  languageCode?: LanguageCode;
  plural?: string;
  gender?: Gender;
  class?: WordClass;
}

export interface IWords {
  form: {
    word: IWord;
    editWord?: IWord;
  };
  list: IWord[];
  lastWordId: number;
}

export interface IGenderViewModel {
  code: Gender;
  name: string;
}

export interface IWordClassViewModel {
  code: WordClass;
  name: string;
}

export interface IWordViewModel {
  word: IWord;
}
