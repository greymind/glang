import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { NgReduxFormModule } from '@angular-redux/form';

import { StoreModule } from './store/module';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { CardsComponent } from './cards/cards.component';
import { CardsActions } from './cards/cards.actions';

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
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    NgReduxFormModule,
    // AnimalModule,
    // ElephantModule,
    // LionModule,
    // FeedbackModule,
    StoreModule,
  ],
  providers: [CardsActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
