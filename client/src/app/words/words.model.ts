import { Gender, WordClass } from '../core/core.model';
import { LanguageCode, ISingularForm, IPluralForm } from '../languages/languages.model';

export interface IFormTable {
  name: string;
  singular: ISingularForm;
  plural: IPluralForm;
}

export interface IWord {
  id?: number;
  text?: string;
  languageCode?: LanguageCode;
  plural?: string;
  gender?: Gender;
  class?: WordClass;
  formTables?: IFormTable[];
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
