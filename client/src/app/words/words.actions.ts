import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IWordViewModel, IWord } from './words.model';

export type WordsAction = FluxStandardAction<IWordViewModel>;

@Injectable()
export class WordsActions {
  static readonly TryAddWord = 'Words-TryAddWord';
  static readonly AddWord = 'Words-AddWord';
  static readonly UpdateWord = 'Words-UpdateWord';
  static readonly DeleteWord = 'Words-DeleteWord';

  @dispatch()
  tryAddWord = (word: IWord): WordsAction => ({
    type: WordsActions.TryAddWord,
    payload: {
      word
    }
  })

  @dispatch()
  updateWord = (word: IWord): WordsAction => ({
    type: WordsActions.UpdateWord,
    payload: {
      word
    }
  })

  @dispatch()
  deleteWord = (id: number): WordsAction => ({
    type: WordsActions.DeleteWord,
    payload: {
      word: {
        id
      }
    }
  })

  addWord = (word: IWord): WordsAction => ({
    type: WordsActions.AddWord,
    payload: {
      word
    }
  })
}
