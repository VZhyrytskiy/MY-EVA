/**
 * Компонент для отображения слова - карточка слова
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';
import { Observable } from 'rxjs';
import { TypeOfSpeech } from 'src/app/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.css']
})
export class WordCardComponent implements OnInit {
  level: string;
  letter: string;
  word: string;
  typeOfSpeach: TypeOfSpeech;

  listofMeanings$: Observable<any>;
  listofMeaningsRu: string[];


  listOfNouns$: Observable<string[]>;
  listOfAdjectives$: Observable<string[]>;
  listOfAdverbs$: Observable<string[]>;
  listOfPrepositions$: Observable<string[]>;
  listOfVerbs$: Observable<string[]>;
  listOfPhrasalVerbs$: Observable<string[]>;
  listOfPlusVerbs$: Observable<string[]>;
  listOfPhrases$: Observable<string[]>;
  listOfPatterns$: Observable<string[]>;
  listOfIdioms$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.level = this.route.snapshot.paramMap.get('level');
    this.letter = this.route.snapshot.paramMap.get('letter');
    this.word = this.route.snapshot.paramMap.get('word');
    this.typeOfSpeach = this.route.snapshot.paramMap.get('typeOfSpeech') as TypeOfSpeech;

    // установить текущее слово и часть речи для него
    this.loaderService.setCurrentWord(this.word);
    this.loaderService.setTypeOfSpeechForCurrentWord(this.typeOfSpeach);
    this.buildWordView();
  }

  onGotoAlphabet(level: string) {
    this.router.navigate([`/alphabet/${level}`]);
  }

  onGotoWordsList(level: string, letter: string) {
    this.router.navigate([`/alphabet/${level}/${letter}`]);
  }

  onOpenDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {
        word: this.word,
        listofMeaningsRu: this.listofMeaningsRu
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });

  }

  private buildWordView() {
    this.listofMeanings$ = this.loaderService.getWordMeanings();
    this.loaderService.getWordMeanings().subscribe(data => {
      this.listofMeaningsRu = data.map(item => item.ru);
      console.log(this.listofMeaningsRu);
    });
    // this.listofMeasnings$.subscribe(data => console.log(data));

    this.listOfAdjectives$ = this.loaderService.getListOfPartner('adjective');
    this.listOfNouns$ = this.loaderService.getListOfPartner('noun');
    this.listOfPrepositions$ = this.loaderService.getListOfPartner('preposition');
    this.listOfVerbs$ = this.loaderService.getListOfPartner('verb');
    this.listOfPhrasalVerbs$ = this.loaderService.getListOfPartner('phrasal verb');
    this.listOfPlusVerbs$ = this.loaderService.getListOfPartner('+verb');
    this.listOfPhrases$ = this.loaderService.getListOfPartner('phrase');
    this.listOfPatterns$ = this.loaderService.getListOfPartner('pattern');
    this.listOfIdioms$ = this.loaderService.getListOfPartner('idiom');
  }


}
