import { WordsComponent } from './words/words.component';
import { CardsComponent } from './cards/cards.component';
import { EditWordComponent } from './words/edit-word/edit-word.component';

export const appRoutes = [
  { path: '', redirectTo: '/words', pathMatch: 'full' },
  { path: 'words', component: WordsComponent },
  { path: 'words/:id', component: EditWordComponent },
  { path: 'cards', component: CardsComponent },
];
