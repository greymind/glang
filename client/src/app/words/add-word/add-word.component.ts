import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { ILanguage, LanguageCode } from '../../languages/languages.model';
import { Subscription } from 'rxjs';
import { IGenderViewModel, IWordViewModel, IWord, IWordClassViewModel } from '../words.model';
import { Gender, WordClass } from '../../core/core.model';
import { determineGender } from '../words.helpers';
import * as R from 'ramda';
import { WordsActions } from '../words.actions';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'glang-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWordComponent implements OnInit, OnDestroy, OnChanges {
  @Input() path: string;
  @Input() focusPath: string;
  @ViewChild('text') textElement: ElementRef;

  languages: ILanguage[];
  lastLanguageCode: LanguageCode;

  genders: IGenderViewModel[];
  autoGender: boolean;
  lastGender: Gender;
  isGenderEnabled: boolean;

  wordClasses: IWordClassViewModel[];

  subscriptions: Subscription[];

  wordForm: FormGroup;

  constructor(
    private store: NgRedux<IAppState>,
    private wordActions: WordsActions,
    private formBuilder: FormBuilder
  ) {
    this.autoGender = true;

    const languageSubscription = store.select<ILanguage[]>(['languages', 'list'])
      .subscribe(languages => {
        this.languages = [].concat(languages);
      });

    this.subscriptions = [
      languageSubscription,
    ];

    this.createForm();

    this.initGenders();
    this.initWordClasses();
  }

  getFormValue() {
    const value = this.wordForm.value;

    return <IWord>{
      text: value.text,
      languageCode: value.languageCode,
      plural: value.plural || null,
      gender: value.gender || null,
      class: value.class || null,
      formTables: value.formTables || null
    };
  }

  setFormValue(word: IWord) {
    this.wordForm.reset({
      text: word.text,
      languageCode: word.languageCode,
      plural: word.plural || '',
      gender: word.gender || null,
      class: word.class || null,
    });

    this.wordForm.setControl('formTables',
      this.formBuilder.array(
        (word.formTables || []).map(ft => this.formBuilder.group({
          name: ft.name,
          singular: this.formBuilder.group(ft.singular),
          plural: this.formBuilder.group(ft.plural)
        }))
      )
    );
  }

  get formTables(): FormArray {
    return this.wordForm.get('formTables') as FormArray;
  }

  createForm() {
    this.wordForm = this.formBuilder.group({
      text: ['', Validators.required],
      languageCode: LanguageCode.English,
      plural: '',
      gender: null,
      class: null,
      formTables: this.formBuilder.array([])
    });

    this.lastLanguageCode = this.wordForm.value.languageCode;
  }

  createFormTable() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      singular: this.formBuilder.group({
        me: '', you: '', he: '', she: '', it: ''
      }),
      plural: this.formBuilder.group({
        we: '', youAll: '', heAll: '', sheAll: '', itAll: ''
      })
    });
  }

  resetForm() {
    this.wordForm.reset({
      languageCode: this.wordForm.value.languageCode || LanguageCode.English
    });

    this.lastLanguageCode = this.wordForm.value.languageCode;
  }

  focusText() {
    this.textElement.nativeElement.focus();
  }

  addFormTable() {
    this.formTables.push(this.createFormTable());
  }

  removeFormTable(i: number) {
    this.formTables.removeAt(i);
  }

  private initWordClasses() {
    this.wordClasses = [];
    for (const wordClass in WordClass) {
      if (WordClass.hasOwnProperty(wordClass)) {
        const isValue = parseInt(wordClass, 10) >= 0;

        if (!isValue) {
          continue;
        }

        this.wordClasses.push({
          code: <any>wordClass,
          name: WordClass[wordClass]
        });
      }
    }
  }

  private initGenders() {
    this.genders = [];
    for (const gender in Gender) {
      if (Gender.hasOwnProperty(gender)) {
        const isValue = parseInt(gender, 10) >= 0;

        if (!isValue) {
          continue;
        }

        this.genders.push({
          code: <any>gender,
          name: Gender[gender]
        });
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

  ngOnChanges() {
    this.resetForm();
  }

  ngOnInit() {
    const formSubscription = this.wordForm.valueChanges
      .subscribe((word: IWord) => {
        if (word.languageCode !== this.lastLanguageCode) {
          const language = this.languages.find(l => l.code === word.languageCode);

          this.isGenderEnabled = language && language.gender;
          this.autoGender = true;
          this.lastGender = null;
          this.lastLanguageCode = word.languageCode;
        }

        if (this.isGenderEnabled) {
          const didUserChangeGender = !R.isNil(word.gender)
            && word.gender !== this.lastGender;

          if (!didUserChangeGender
            && !R.isNil(word.text)
            && !R.isEmpty(word.text)
            && (R.isNil(word.gender) || this.autoGender)) {
            const gender = determineGender(word.text, word.languageCode);

            if (R.isNil(gender)) {
              this.setGender(null);
            } else {
              this.setGender(gender);

              this.lastGender = gender;
              this.autoGender = true;
            }
          }
        } else {
          this.setGender(null);
        }
      });

    this.subscriptions.push(
      formSubscription
    );
  }

  private setGender(gender: Gender) {
    if (this.wordForm.value.gender !== gender) {
      this.wordForm.patchValue({
        gender: gender
      });
    }
  }

}
