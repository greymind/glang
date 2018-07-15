import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { ILanguage, LanguageCode } from '../../languages/languages.model';
import { Subscription } from 'rxjs';
import { IGenderViewModel } from '../words.model';
import { Gender } from '../../core/core.model';

@Component({
  selector: 'glang-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit, OnDestroy {
  @Input() path: string;

  languages: ILanguage[];
  genders: IGenderViewModel[];
  isGenderEnabled: boolean;

  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
  ) {
    const languageSubscription = store.select<ILanguage[]>(['languages', 'list'])
      .subscribe(languages => {
        this.languages = [].concat(languages);
      });

    this.subscriptions = [
      languageSubscription,
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

  ngOnDestroy() {
    this.subscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    const languageCodeSubscription = this.store.select<LanguageCode>(this.path.concat('languageCode'))
      .subscribe(languageCode => {
        const language = this.languages.find(l => l.code === languageCode);
        this.isGenderEnabled = language && language.gender;
      });

    this.subscriptions.push(languageCodeSubscription);
  }

}
