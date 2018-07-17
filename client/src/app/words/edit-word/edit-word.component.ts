import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { IWord } from '../words.model';
import { Subscription } from 'rxjs';
import { WordsActions } from '../words.actions';
import { AddWordComponent } from '../add-word/add-word.component';
import * as R from 'ramda';

@Component({
  selector: 'glang-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('word') wordRef: AddWordComponent;

  id: number;

  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
    private route: ActivatedRoute,
    private location: Location,
    private wordActions: WordsActions,
    private router: Router,
  ) {
    this.subscriptions = [];
  }

  updateWord() {
    const word = <IWord>this.wordRef.getFormValue();
    word.id = this.id;

    this.wordActions.updateWord(word);
  }

  deleteWord() {
    this.wordActions.deleteWord(this.id);
    this.router.navigateByUrl('/words');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {

    const wordSubscription = this.store.select<IWord[]>(['words', 'list'])
      .subscribe(words => {
        const word = words.find(w => w.id === this.id);
        if (!R.isNil(word)) {
          this.wordRef.setFormValue(word);
        }
      });

    this.subscriptions.push(wordSubscription);

    this.wordRef.focusText();
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

}
