import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { select, NgRedux } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { IWord, IGenderViewModel } from './words.model';
import { WordsActions } from './words.actions';
import { IAppState } from '../store/model';
import { reverse } from 'ramda';
import { AddWordComponent } from './add-word/add-word.component';

@Component({
  selector: 'glang-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('word') wordRef: AddWordComponent;

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

  addWord() {
    const word = this.wordRef.getFormValue();

    this.wordsActions.tryAddWord(word);

    this.wordRef.resetForm();
    this.wordRef.focusText();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.wordRef.focusText();
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(sub => sub.unsubscribe());
  }

}
