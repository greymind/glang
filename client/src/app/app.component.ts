import { Component } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { CounterActions } from './app.actions';
import { IAppState } from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  @select() readonly count$: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: CounterActions
  ) {
  }

  increment() {
    this.ngRedux.dispatch(this.actions.increment());
  }
  decrement() {
    this.ngRedux.dispatch(this.actions.decrement());
  }
}
