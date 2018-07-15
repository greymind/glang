import { Injectable } from '@angular/core';
import { ofType, ActionsObservable, StateObservable } from 'redux-observable';
import { WordsActions } from '../words/words.actions';
import { IAppState } from '../store/model';
import { withLatestFrom, mergeMap } from 'rxjs/operators';
import { CardsActions, CardsAction } from './cards.actions';
import { findWord } from '../words/words.helpers';

@Injectable()
export class CardsEpics {
  constructor(
    private wordsActions: WordsActions,
    private cardsActions: CardsActions
  ) { }

  addWordsAndCard = (action$: ActionsObservable<CardsAction>) =>
    action$.pipe(
      ofType(CardsActions.AddWordsAndCard),
      mergeMap(action => {
        return [
          this.wordsActions.addWord(action.payload.frontWord),
          this.wordsActions.addWord(action.payload.backWord),
          this.cardsActions.addCardWithWords(action.payload)
        ];
      })
    )

  addCardWithWords = (action$: ActionsObservable<CardsAction>, state$: StateObservable<IAppState>) =>
    action$.pipe(
      ofType(CardsActions.AddCardWithWords),
      withLatestFrom(state$),
      mergeMap(([action, state]) => {
        const payload = action.payload;

        const frontWord = payload.frontWord;
        const frontWordId = findWord(state.words.list, frontWord.text, frontWord.languageCode).id;

        const backWord = payload.backWord;
        const backWordId = findWord(state.words.list, backWord.text, backWord.languageCode).id;

        return [
          this.cardsActions.addCard(frontWordId, backWordId)
        ];
      })
    )
}
