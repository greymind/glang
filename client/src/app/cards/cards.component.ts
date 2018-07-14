import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from '../store/model';
import { select, select$, NgRedux } from '@angular-redux/store';
import { ICardViewModel, ICard } from './cards.model';
import { IWord } from '../words/words.model';
import { CardsActions } from './cards.actions';

@Component({
  selector: 'glang-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit, OnDestroy {
  words: IWord[];
  cardViewModels: ICardViewModel[];

  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
    private cardsActions: CardsActions,
  ) {
    const wordsSubscription = store.select<IWord[]>(['words', 'words'])
      .subscribe(words => {
        this.words = words;
      });

    const cardsSubscription = store.select<ICard[]>(['cards', 'cards'])
      .subscribe(cards => {
        this.cardViewModels = cards
          .map(x => ({
            frontWord: this.words.find(w => w.id === x.frontWordId),
            backWord: this.words.find(w => w.id === x.backWordId)
          }));
      });

    this.subscriptions = [
      wordsSubscription,
      cardsSubscription,
    ];
  }

  ngOnDestroy() {
    console.log('bye');

    this.subscriptions
      .forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
  }

  addCard() {
    console.log('form', this.store.getState().cards.form);
    this.cardsActions.addCard();
  }

}
