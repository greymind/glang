import { Component, OnInit } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState, IWord } from '../store/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'glang-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  @select() readonly words$: Observable<IWord[]>;

  constructor() { }

  ngOnInit() {
  }

}
