import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IWordViewModel } from './words.model';
import { Gender, WordClass } from '../core/core.model';
import { LanguageCode } from '../languages/languages.model';

export type WordsAction = FluxStandardAction<IWordViewModel>;

@Injectable()
export class WordsActions {
  static readonly TryAddWord = 'Words-TryAddWord';
  static readonly AddWord = 'Words-AddWord';

  @dispatch()
  tryAddWord = (text: string, languageCode: LanguageCode, plural?: string, gender?: Gender, wordClass?: WordClass): WordsAction => ({
    type: WordsActions.TryAddWord,
    payload: {
      word: {
        text,
        languageCode,
        plural,
        gender,
        class: wordClass
      },
      autoGender: false
    }
  })

  addWord = (text: string, languageCode: LanguageCode, plural?: string, gender?: Gender, wordClass?: WordClass): WordsAction => ({
    type: WordsActions.AddWord,
    payload: {
      word: {
        text,
        languageCode,
        plural,
        gender,
        class: wordClass
      },
      autoGender: false
    }
  })
}
