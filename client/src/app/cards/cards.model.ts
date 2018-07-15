import { IWord } from '../words/words.model';

export interface ICard {
  id: number;
  frontWordId: number;
  backWordId: number;
}

export interface ICards {
  form: ICardViewModel;
  list: ICard[];
  lastCardId: number;
  focusTrigger?: number;
}

export interface ICardViewModel {
  frontWord: IWord;
  backWord: IWord;
}
