import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from '../store/model';
import { select, select$, NgRedux } from '@angular-redux/store';
import { ICardViewModel, ICard } from './cards.model';
import { IWord } from '../words/words.model';
import { CardsActions } from './cards.actions';
import { ILanguage } from '../languages/languages.model';
import { clone, reverse } from 'ramda';

@Component({
  selector: 'glang-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit, OnDestroy {
  languages: ILanguage[];
  words: IWord[];
  cardViewModels: ICardViewModel[];

  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
    private cardsActions: CardsActions,
  ) {
    const languageSubscription = store.select<ILanguage[]>(['languages', 'list'])
      .subscribe(languages => {
        this.languages = clone(languages);
      });

    const wordsSubscription = store.select<IWord[]>(['words', 'list'])
      .subscribe(words => {
        this.words = clone(words);
      });

    const cardsSubscription = store.select<ICard[]>(['cards', 'list'])
      .subscribe(cards => {
        this.cardViewModels = reverse(cards)
          .map(x => ({
            frontWord: this.words.find(w => w.id === x.frontWordId),
            backWord: this.words.find(w => w.id === x.backWordId)
          }));
      });

    this.subscriptions = [
      languageSubscription,
      wordsSubscription,
      cardsSubscription,
    ];
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
  }

  addCard() {
    const form = this.store.getState().cards.form;

    const frontWord: IWord = {
      text: form.frontWord.text,
      languageCode: form.frontWord.languageCode,
      plural: form.frontWord.plural,
    };

    const backWord: IWord = {
      text: form.backWord.text,
      languageCode: form.backWord.languageCode,
      plural: form.backWord.plural,
    };

    this.cardsActions.addWordsAndCard({
      frontWord,
      backWord
    });
  }

}
