import { Injectable } from '@angular/core';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { WordsEpics } from '../words/words.epics';
import { CardsEpics } from '../cards/cards.epics';

@Injectable()
export class RootEpics {
  constructor(
    private wordsEpics: WordsEpics,
    private cardsEpics: CardsEpics
  ) { }

  public createEpics() {
    return combineEpics(
      this.wordsEpics.tryAddWord,
      this.cardsEpics.addWordsAndCard,
      this.cardsEpics.addCardWithWords
    );
  }
}
