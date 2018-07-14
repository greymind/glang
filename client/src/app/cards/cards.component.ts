import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from '../store/model';
import { select } from '@angular-redux/store';

@Component({
  selector: 'glang-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @select() readonly cards$: Observable<ICard[]>;

  constructor() { }

  ngOnInit() {
  }

}
