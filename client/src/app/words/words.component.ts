import { Component, OnInit, OnDestroy } from '@angular/core';

import { select, NgRedux } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IWord } from './words.model';
import { WordsActions } from './words.actions';
import { IAppState } from '../store/model';
import { LanguageCode, ILanguage } from '../languages/languages.model';

@Component({
  selector: 'glang-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit, OnDestroy {
  @select(['words', 'list']) readonly words$: Observable<IWord[]>;
  languages: ILanguage[];
  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
    private wordsActions: WordsActions
  ) {
    const languageSubscription = store.select<ILanguage[]>(['languages', 'list'])
      .subscribe(languages => {
        this.languages = [].concat(languages);
      });

    this.subscriptions = [
      languageSubscription
    ];
  }

  addWord() {
    const form = this.store.getState().words.form;
    this.wordsActions.addWord(form.text, form.languageCode, form.plural, form.gender);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(sub => sub.unsubscribe());
  }

}
