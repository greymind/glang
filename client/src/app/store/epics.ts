import { Injectable } from '@angular/core';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { WordsEpics } from '../words/words.epics';

@Injectable()
export class RootEpics {
  constructor(private wordsEpics: WordsEpics) { }

  public createEpics() {
    return combineEpics(
      this.wordsEpics.tryAddWord()
    );
  }
}
