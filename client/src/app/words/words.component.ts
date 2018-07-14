import { Component, OnInit, OnDestroy } from '@angular/core';

import { select, NgRedux } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IWord, IGenderViewModel } from './words.model';
import { WordsActions } from './words.actions';
import { IAppState } from '../store/model';
import { ILanguage, LanguageCode } from '../languages/languages.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Gender } from '../core/core.model';

@Component({
  selector: 'glang-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit, OnDestroy {
  @select(['words', 'list']) readonly words$: Observable<IWord[]>;

  languages: ILanguage[];
  genders: IGenderViewModel[];
  subscriptions: Subscription[];
  isGenderEnabled: boolean;

  constructor(
    private store: NgRedux<IAppState>,
    private wordsActions: WordsActions
  ) {
    const languageSubscription = store.select<ILanguage[]>(['languages', 'list'])
      .subscribe(languages => {
        this.languages = [].concat(languages);
      });

    const languageCodeSubscription = store.select<LanguageCode>(['words', 'form', 'word', 'languageCode'])
      .subscribe(languageCode => {
        this.isGenderEnabled = this.languages.find(l => l.code === languageCode).gender === true;
      });

    this.subscriptions = [
      languageSubscription,
      languageCodeSubscription
    ];

    this.genders = [];
    for (const gender in Gender) {
      if (Gender.hasOwnProperty(gender)) {
        const isValue = parseInt(gender, 10) >= 0;

        if (!isValue) {
          continue;
        }

        this.genders.push({
          code: <any>gender,
          name: Gender[gender]
        });
      }
    }
  }

  addWord() {
    const form = this.store.getState().words.form.word;
    this.wordsActions.addWord(form.text, form.languageCode, form.plural, form.gender);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(sub => sub.unsubscribe());
  }

}
