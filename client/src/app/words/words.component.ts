import { Component, OnInit } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { IWord } from './words.model';

@Component({
  selector: 'glang-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  @select(['words', 'words']) readonly words$: Observable<IWord[]>;

  constructor() { }

  addWord() {

  }

  ngOnInit() {
  }

}
