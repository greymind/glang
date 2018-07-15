import { IWord } from './words.model';
import { LanguageCode } from '../languages/languages.model';
import { Gender } from '../core/core.model';
import * as R from 'ramda';

export function findWord(list: IWord[], text: string, languageCode: LanguageCode): IWord | undefined {
  return list.find(w => w.languageCode === languageCode && w.text === text);
}

export function determineGender(text: string, languageCode: LanguageCode): Gender {
  if (languageCode === LanguageCode.Croatian) {
    const isFemale = R.endsWith('a', text);
    const isNeutral = R.endsWith('o', text) || R.endsWith('e', text);

    const gender = isFemale
      ? Gender.Female
      : isNeutral
        ? Gender.Neutral
        : Gender.Male;

    return gender;
  }

  return null;
}
