import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { ILanguage, LanguageCode } from '../../languages/languages.model';
import { Subscription } from 'rxjs';
import { IGenderViewModel, IWordViewModel, IWord, IWordClassViewModel } from '../words.model';
import { Gender, WordClass } from '../../core/core.model';
import { determineGender } from '../words.helpers';
import * as R from 'ramda';

@Component({
  selector: 'glang-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit, OnDestroy {
  @Input() path: string;
  @Input() focusPath: string;
  @ViewChild('text') textElement: ElementRef;

  languages: ILanguage[];

  genders: IGenderViewModel[];
  autoGender: boolean;
  lastGender: Gender;
  isGenderEnabled: boolean;

  wordClasses: IWordClassViewModel[];

  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
  ) {
    this.autoGender = true;

    const languageSubscription = store.select<ILanguage[]>(['languages', 'list'])
      .subscribe(languages => {
        this.languages = [].concat(languages);
      });

    this.subscriptions = [
      languageSubscription,
    ];

    this.initGenders();
    this.initWordClasses();
  }

  initWordClasses() {
    this.wordClasses = [];
    for (const wordClass in WordClass) {
      if (WordClass.hasOwnProperty(wordClass)) {
        const isValue = parseInt(wordClass, 10) >= 0;

        if (!isValue) {
          continue;
        }

        this.wordClasses.push({
          code: <any>wordClass,
          name: WordClass[wordClass]
        });
      }
    }
  }

  initGenders() {
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

  ngOnDestroy() {
    this.subscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    const languageCodeSubscription = this.store.select<LanguageCode>(this.path.concat('languageCode'))
      .subscribe(languageCode => {
        const language = this.languages.find(l => l.code === languageCode);

        this.isGenderEnabled = language && language.gender;
        this.autoGender = true;
        this.lastGender = null;
      });

    const formSubscription = this.store.select<IWord>(this.path)
      .subscribe(word => {
        if (this.isGenderEnabled) {
          const didUserChangeGender = !R.isNil(word.gender)
            && word.gender !== this.lastGender;

          if (!didUserChangeGender
            && !R.isNil(word.text)
            && !R.isEmpty(word.text)
            && (R.isNil(word.gender) || this.autoGender)) {
            const gender = determineGender(word.text, word.languageCode);

            if (R.isNil(gender)) {
              word.gender = null;
            } else {
              word.gender = gender;

              this.lastGender = gender;
              this.autoGender = true;
            }
          }
        } else {
          word.gender = null;
        }
      });

    if (!R.isNil(this.focusPath)) {
      const focusPathSubscription = this.store.select<number>(this.focusPath)
        .subscribe(num => {
          this.textElement.nativeElement.focus();
        });

      this.subscriptions.push(
        focusPathSubscription
      );
    }

    this.subscriptions.push(
      languageCodeSubscription,
      formSubscription
    );
  }

}
