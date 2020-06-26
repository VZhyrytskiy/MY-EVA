/**
 * Компонент для отображения слов на выбранную букву
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';
import { Observable, Subscription } from 'rxjs';
import { count, tap, map } from 'rxjs/operators';
import { TypeOfSpeech } from './../../../core';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit, OnDestroy {
  level: string;
  letter: string;

  listOfAdjectives: any[];
  countOfAdjectives: number;
  listOfAdverbs: any[];
  countOfAdverbs: number;
  listOfNouns: any[];
  countOfNouns: number;
  listOfPrepositions: any[];
  countOfPrepositions: number;
  listOfVerbs: any[];
  countOfVerbs: number;
  listOfModalVerbs: any[];
  countOfModalVerbs: number;
  listOfPhrasalVerbs: any[];
  countOfPhrasalVerbs: number;

  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let sub: Subscription;

    this.level = this.route.snapshot.paramMap.get('level');
    this.letter = this.route.snapshot.paramMap.get('letter');

    // Списки слов и их количество
    sub = this.loaderService.getWordsList('adjective', this.level, this.letter).subscribe({
      next: (list) => {
        this.listOfAdjectives = list;
        this.countOfAdjectives = list.length;
      }
    });
    this.sub.add(sub);

    sub = this.loaderService.getWordsList('adverb', this.level, this.letter).subscribe({
      next: (list) => {
        this.listOfAdverbs = list;
        this.countOfAdverbs = list.length;
      }
    });
    this.sub.add(sub);

    sub = this.loaderService.getWordsList('modal_verb', this.level, this.letter).subscribe({
      next: (list) => {
        this.listOfModalVerbs = list;
        this.countOfModalVerbs = list.length;
      }
    });
    this.sub.add(sub);

    sub = this.loaderService.getWordsList('noun', this.level, this.letter).subscribe({
      next: (list) => {
        this.listOfNouns = list;
        this.countOfNouns = list.length;
      }
    });
    this.sub.add(sub);

    sub = this.loaderService.getWordsList('phrasal_verb', this.level, this.letter).subscribe({
      next: (list) => {
        this.listOfPhrasalVerbs = list;
        this.countOfPhrasalVerbs = list.length;
      }
    });
    this.sub.add(sub);

    sub = this.loaderService.getWordsList('preposition', this.level, this.letter).subscribe({
      next: (list) => {
        this.listOfPrepositions = list;
        this.countOfPrepositions = list.length;
      }
    });
    this.sub.add(sub);

    sub = this.loaderService.getWordsList('verb', this.level, this.letter).subscribe({
      next: (list) => {
        this.listOfVerbs = list;
        this.countOfVerbs = list.length;
      }
    });
    this.sub.add(sub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onGotoAlphabet(level: string) {
    this.router.navigate([`/alphabet/${level}`]);
  }

  buildPath(typeOfSpeach: TypeOfSpeech, word: string): Array<string> {
    return [`/alphabet/${this.level}/${this.letter}/${word}/${typeOfSpeach}`];
  }

}
