import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IWord } from './words.model';
import { Gender, WordClass } from '../core/core.model';
import { LanguageCode } from '../languages/languages.model';

export type WordsAction = FluxStandardAction<IWord>;

@Injectable()
export class WordsActions {
  static readonly AddWord = 'Words-AddWord';

  @dispatch()
  addWord = (text: string, languageCode: LanguageCode, plural?: string, gender?: Gender, wordClass?: WordClass): WordsAction => ({
    type: WordsActions.AddWord,
    payload: {
      text,
      languageCode,
      plural,
      gender,
      class: wordClass
    }
  })
}
