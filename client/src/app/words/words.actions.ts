import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IWordViewModel, IWord } from './words.model';

export type WordsAction = FluxStandardAction<IWordViewModel>;

@Injectable()
export class WordsActions {
  static readonly TryAddWord = 'Words-TryAddWord';
  static readonly AddWord = 'Words-AddWord';

  @dispatch()
  tryAddWord = (word: IWord): WordsAction => ({
    type: WordsActions.TryAddWord,
    payload: {
      word
    }
  })

  addWord = (word: IWord): WordsAction => ({
    type: WordsActions.AddWord,
    payload: {
      word
    }
  })
}
