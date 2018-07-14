import { ICards } from './cards.model';
import { CardsAction, CardsActions } from './cards.actions';

const InitialState: ICards = {
  form: {},
  list: [{
    id: 0,
    frontWordId: 0,
    backWordId: 1
  }],
  lastCardId: 0,
};

export function cardsReducer(state: ICards = InitialState, action: CardsAction): ICards {
  switch (action.type) {
    case CardsActions.AddCard:
      return {
        ...state,
        form: {},
        list: [
          ...state.list,
          { id: state.lastCardId + 1, frontWordId: 1, backWordId: 0 }
        ],
        lastCardId: state.lastCardId + 1
      };
  }

  return state;
}
