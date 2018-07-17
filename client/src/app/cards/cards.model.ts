import { IWord } from '../words/words.model';

export interface ICard {
  id: number;
  frontWordId: number;
  backWordId: number;
}

export interface ICards {
  list: ICard[];
  lastCardId: number;
  focusTrigger?: number;
}

export interface ICardViewModel {
  frontWord: IWord;
  backWord: IWord;
}
