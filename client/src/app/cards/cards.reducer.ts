import { ICards } from './cards.model';
import { CardsAction, CardsActions } from './cards.actions';

const InitialState = {
  form: {},
  cards: [{
    id: 0,
    frontWordId: 0,
    backWordId: 1
  }]
};

export function cardsReducer(state: ICards = InitialState, action: CardsAction): ICards {
  switch (action.type) {
    case CardsActions.AddCard:
      return {
        ...state,
        cards: [
          ...state.cards,
          { id: -1, frontWordId: -1, backWordId: -1 }
        ]
      };
  }

  return state;
}
