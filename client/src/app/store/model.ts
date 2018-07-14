import { IWords } from '../words/words.model';
import { ICards } from '../cards/cards.model';

export interface IAppState {
  // languages?: ILanguage[];
  words?: IWords;
  cards?: ICards;
  router?: string;
}
