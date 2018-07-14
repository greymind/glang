import { ICard } from '../store/model';
import { Action } from 'redux';

const InitialState = [{
  frontWordId: 0,
  backWordId: 1
}];

export function cardsReducer(state: ICard[] = InitialState, action: Action) {
  return state;
}
