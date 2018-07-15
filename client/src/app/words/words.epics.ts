import { Injectable } from '@angular/core';
import { Epic, ofType, ActionsObservable, StateObservable } from 'redux-observable';
import { WordsAction, WordsActions } from './words.actions';
import { IAppState } from '../store/model';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class WordsEpics {
  constructor(
    private wordsActions: WordsActions
  ) { }

  tryAddWord = (action$: ActionsObservable<WordsAction>, state$: StateObservable<IAppState>) =>
    action$.pipe(
      ofType(WordsActions.TryAddWord),
      map(action => {
        return this.wordsActions.addWord(
          action.payload.word.text,
          action.payload.word.languageCode,
          '',
          action.payload.word.gender
        );
      })
    )
}
