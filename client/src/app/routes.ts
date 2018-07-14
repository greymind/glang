import { WordsComponent } from './words/words.component';
import { CardsComponent } from './cards/cards.component';

export const appRoutes = [
  { path: '', redirectTo: '/words', pathMatch: 'full' },
  { path: 'words', component: WordsComponent },
  { path: 'cards', component: CardsComponent },
];
