import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { IWord, IGenderViewModel } from '../words.model';
import { Subscription } from 'rxjs';
import { WordsActions } from '../words.actions';
import { ILanguage } from '../../languages/languages.model';
import { Gender } from '../../core/core.model';

@Component({
  selector: 'glang-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit, OnDestroy {
  word: IWord;

  subscriptions: Subscription[];

  constructor(
    private store: NgRedux<IAppState>,
    private route: ActivatedRoute,
    private location: Location,
    private wordActions: WordsActions,
  ) {
    this.subscriptions = [];
  }

  updateWord() {
    const word = this.store.getState().words.form.editWord;
    this.wordActions.updateWord(word);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    const wordSubscription = this.store.select<IWord[]>(['words', 'list'])
      .subscribe(words => {
        this.word = words.find(w => w.id === id);
        this.wordActions.viewWord(this.word);
      });

    this.subscriptions.push(wordSubscription);
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

}
