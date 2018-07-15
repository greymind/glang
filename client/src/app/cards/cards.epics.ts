import { Injectable } from '@angular/core';
import { Epic, ofType, ActionsObservable, StateObservable } from 'redux-observable';
import { WordsAction, WordsActions } from '../words/words.actions';
import { IAppState } from '../store/model';
import { map, delay } from 'rxjs/operators';
import { CardsActions, CardsAction } from './cards.actions';

@Injectable()
export class CardsEpics {
  constructor(
    private cardsActions: CardsActions
  ) { }

  addCard = (action$: ActionsObservable<CardsAction>, state$: StateObservable<IAppState>) =>
    action$.pipe(
      ofType(CardsActions.AddCard),
      map(action => {
        return this.cardsActions.addCard();
      })
    )
}
