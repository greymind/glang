import { IWord } from '../words/words.model';

export interface ICard {
  id: number;
  frontWordId: number;
  backWordId: number;
}

export interface ICards {
  form: any;
  cards: ICard[];
}

export interface ICardViewModel {
  frontWord: IWord;
  backWord: IWord;
}
