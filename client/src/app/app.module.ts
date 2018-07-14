import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

import { StoreModule } from './store/module';

import { CounterActions } from './actions';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    CardsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    // AnimalModule,
    // ElephantModule,
    // LionModule,
    // FeedbackModule,
    StoreModule,
  ],
  providers: [CounterActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
