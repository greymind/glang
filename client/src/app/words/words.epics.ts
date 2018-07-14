import { Injectable } from '@angular/core';
import { Epic, ofType } from 'redux-observable';
import { WordsAction, WordsActions } from './words.actions';
import { IAppState } from '../store/model';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class WordsEpics {

  constructor(
    private wordsActions: WordsActions
  ) { }

  tryAddWord(): Epic<WordsAction, WordsAction, IAppState> {
    return (action$, state) => action$.pipe(
      ofType(WordsActions.TryAddWord),
      map(x => {
        return this.wordsActions.addWord(
          x.payload.word.text,
          x.payload.word.languageCode,
          x.payload.word.gender
        );
      })
    );
  }
}
