import { ILanguages } from '../languages/languages.model';
import { IWords } from '../words/words.model';
import { ICards } from '../cards/cards.model';

export interface IAppState {
  languages?: ILanguages;
  words?: IWords;
  cards?: ICards;
  router?: string;
}
