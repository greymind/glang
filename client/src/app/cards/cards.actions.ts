import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IWord } from '../words/words.model';

export interface ICardsPayload {
  frontWord: IWord;
  backWord: IWord;
}

export type CardsAction = FluxStandardAction<ICardsPayload>;

@Injectable()
export class CardsActions {
  static readonly AddCard = 'Cards-AddCard';
  static readonly AddWordsAndCard = 'Cards-AddWordsAndCard';
  static readonly AddCardWithWords = 'Cards-AddCardWithWords';

  @dispatch()
  addWordsAndCard = (payload: ICardsPayload): CardsAction => ({
    type: CardsActions.AddWordsAndCard,
    payload
  })

  addCardWithWords = (payload: ICardsPayload): CardsAction => ({
    type: CardsActions.AddCardWithWords,
    payload
  })

  addCard = (frontWordId: number, backWordId: number): CardsAction => ({
    type: CardsActions.AddCard,
    payload: {
      frontWord: {
        id: frontWordId
      },
      backWord: {
        id: backWordId
      }
    }
  })
}
