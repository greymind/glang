import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IWordViewModel, IWord } from './words.model';

export type WordsAction = FluxStandardAction<IWordViewModel>;

@Injectable()
export class WordsActions {
  static readonly TryAddWord = 'Words-TryAddWord';
  static readonly AddWord = 'Words-AddWord';
  static readonly ViewWord = 'Words-ViewWord';
  static readonly UpdateWord = 'Words-UpdateWord';
  static readonly AddFormTable = 'Words-AddFormTable';

  @dispatch()
  tryAddWord = (word: IWord): WordsAction => ({
    type: WordsActions.TryAddWord,
    payload: {
      word
    }
  })

  @dispatch()
  viewWord = (word: IWord): WordsAction => ({
    type: WordsActions.ViewWord,
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

  addWord = (word: IWord): WordsAction => ({
    type: WordsActions.AddWord,
    payload: {
      word
    }
  })

  @dispatch()
  addFormTable = (word: IWord): WordsAction => ({
    type: WordsActions.AddFormTable,
    payload: {
      word
    }
  })
}
