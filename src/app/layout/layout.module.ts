import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlphabetComponent, DialogComponent, HomeComponent,
  PageNotFoundComponent, WordsListComponent, WordCardComponent } from './components';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent, PageNotFoundComponent, AlphabetComponent, WordsListComponent, WordCardComponent, DialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LayoutModule { }
