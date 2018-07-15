import { Component, OnInit, OnDestroy } from '@angular/core';

import { select, NgRedux } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IWord, IGenderViewModel } from './words.model';
import { WordsActions } from './words.actions';
import { IAppState } from '../store/model';
import { ILanguage, LanguageCode } from '../languages/languages.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Gender } from '../core/core.model';
import { reverse } from 'ramda';

@Component({
  selector: 'glang-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit, OnDestroy {
  words: IWord[];

  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
    private wordsActions: WordsActions
  ) {
    const wordsSubscription = store.select<IWord[]>(['words', 'list'])
      .subscribe(words => {
        this.words = reverse(words);
      });

    this.subscriptions = [
      wordsSubscription
    ];
  }

  onWordClick(word: IWord) {
    console.log(word);
  }

  addWord() {
    const formWord = this.store.getState().words.form.word;

    this.wordsActions.tryAddWord({
      text: formWord.text,
      languageCode: formWord.languageCode,
      plural: formWord.plural,
      gender: formWord.gender
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(sub => sub.unsubscribe());
  }

}
