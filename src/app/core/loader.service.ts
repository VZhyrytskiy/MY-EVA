import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, of } from 'rxjs';
import { tap, map, pluck, share, switchMap } from 'rxjs/operators';
import { TypeOfSpeech, ExtendedTypeOfSpeach } from './../core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  currentWord: string;        // текущее слово
  typeOfSpeech: TypeOfSpeech; // часть речи для текущего слова

  constructor(private http: HttpClient) { }

  // установить текущее слово
  setCurrentWord(currentWword: string) {
    this.currentWord = currentWword;
  }

  // установить часть речи для текущего слова
  setTypeOfSpeechForCurrentWord(typeOfSpeech: TypeOfSpeech) {
    this.typeOfSpeech = typeOfSpeech;
  }

  // вернуть перечень слов для указного части речи, уровня, буквы
  getWordsList(typeOfSpeech: TypeOfSpeech, level: string, letter: string): Observable<any> {
    const url = `/assets/vocab/${typeOfSpeech}/_index.json`;

    return this.http.get<string[]>(url)
      .pipe(
        // tap(val => console.log(val)),

        // { "word": { level: ["B2"], topics: ["Time B2"]}, ... } => ["word", { level: ["B2"], topics: ["Time B2"]} ]
        map( (obj: { [property: string]: any }) => {
          return Object.entries(obj);
        }),

        // ["word", { level: ["B2"], topics: ["Time B2"]} ] => APPLY Filter
        map( entriesArr => {
          return entriesArr.filter((elem: [string, any]) => {
            const [word, options] = elem;
            // Начинается на букву и содержит уровень
            return word.toUpperCase().startsWith(letter.toUpperCase()) &&  options.level.includes(level);
          });
        }),

        // tap(val => console.log(val))
      );
  }

  // вернуть карточку текущего слова
  getWordCard(): Observable<any> {
    let url: string;

    // существительные уже раскиданы по папкам по буквам
    if (this.typeOfSpeech === 'noun') {
      url = `/assets/vocab/${this.typeOfSpeech}/${this.currentWord[0].toLowerCase()}/${this.currentWord}.json`;
    } else {
      url = `/assets/vocab/${this.typeOfSpeech}/${this.currentWord}.json`;
    }

    return this.http.get(url).pipe(share());
  }

  // венуть список слов указаной части речи, которые могут употребояться с текущим словом
  getListOfPartner(typeOfSpeech: ExtendedTypeOfSpeach): Observable<string[]> {
    return this.getWordCard()
      .pipe(
        pluck(`${typeOfSpeech}s`)
      );
  }

  // вернуть массив meanings
  getWordMeanings(): Observable<any> {
    return this.getWordCard()
      .pipe(
        pluck('meanings'),
        map(dataArr => dataArr[0]),
        map(obj => Object.keys(obj).map(key => obj[key])),
        // switchMap(arr => from(arr))
      );
  }
}
