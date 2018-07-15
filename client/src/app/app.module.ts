import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { NgReduxFormModule } from '@angular-redux/form';

import { StoreModule } from './store/module';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { CardsComponent } from './cards/cards.component';
import { LanguagesComponent } from './languages/languages.component';

@NgModule({
  declarations: [
    AppComponent,
    LanguagesComponent,
    WordsComponent,
    CardsComponent,
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
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
