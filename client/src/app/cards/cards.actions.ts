import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';

export type CardsAction = FluxStandardAction<undefined>;

@Injectable()
export class CardsActions {
  static readonly AddCard = 'Cards-AddCard';

  @dispatch()
  addCard = (): CardsAction => ({
    type: CardsActions.AddCard
  })
}
