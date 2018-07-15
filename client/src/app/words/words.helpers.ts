import { IWord } from './words.model';
import { LanguageCode } from '../languages/languages.model';

export function findWord(list: IWord[], text: string, languageCode: LanguageCode): IWord | undefined {
  return list.find(w => w.languageCode === languageCode && w.text === text);
}
