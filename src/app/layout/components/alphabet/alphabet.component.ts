/**
 * Компонент для отображения алфавита
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  level: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.level = this.route.snapshot.paramMap.get('level');
  }

  getAlphabet(): string[] {
    return [...this.alphabet];
  }

  onGotoLetterList(letter: string) {
    this.router.navigate([`/alphabet/${this.level}/${letter}`]);
  }

}
