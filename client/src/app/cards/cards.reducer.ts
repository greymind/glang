import { ICards } from './cards.model';
import { CardsAction, CardsActions } from './cards.actions';
import { LanguageCode } from '../languages/languages.model';

const InitialState: ICards = {
  form: {
    frontWord: {
      languageCode: LanguageCode.Croatian
    },
    backWord: {
      languageCode: LanguageCode.English
    }
  },
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
      const newLastCardId = state.lastCardId + 1;
      const newFocusTrigger = (state.focusTrigger || 0) + 1;

      return {
        ...state,
        form: {
          frontWord: {
            languageCode: state.form.frontWord.languageCode
          },
          backWord: {
            languageCode: state.form.backWord.languageCode
          }
        },
        list: [
          ...state.list,
          { id: newLastCardId, frontWordId: action.payload.frontWord.id, backWordId: action.payload.backWord.id }
        ],
        lastCardId: newLastCardId,
        focusTrigger: newFocusTrigger
      };
  }

  return state;
}
