import { Component } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'glang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Greymind Language Learning';

  @select(['words', 'list', 'length']) wordsCount$;
  @select(['cards', 'list', 'length']) cardsCount$;
}
