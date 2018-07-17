import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from '../store/model';
import { select, select$, NgRedux } from '@angular-redux/store';
import { ICardViewModel, ICard } from './cards.model';
import { IWord } from '../words/words.model';
import { CardsActions } from './cards.actions';
import { ILanguage } from '../languages/languages.model';
import { clone, reverse } from 'ramda';
import { AddWordComponent } from '../words/add-word/add-word.component';

@Component({
  selector: 'glang-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('frontWord') frontWordRef: AddWordComponent;
  @ViewChild('backWord') backWordRef: AddWordComponent;

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

  ngAfterViewInit() {
    this.frontWordRef.focusText();
  }

  addCard() {
    const frontWord = this.frontWordRef.getFormValue();
    const backWord = this.backWordRef.getFormValue();

    this.cardsActions.addWordsAndCard({
      frontWord,
      backWord
    });

    this.frontWordRef.resetForm();
    this.backWordRef.resetForm();
    this.frontWordRef.focusText();
  }

}
