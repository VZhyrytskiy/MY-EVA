import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, PageNotFoundComponent, AlphabetComponent, WordsListComponent, WordCardComponent } from './layout';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'alphabet/:level/:letter/:word/:typeOfSpeech',
    component: WordCardComponent
  },
  {
    path: 'alphabet/:level/:letter',
    component: WordsListComponent
  },
  {
    path: 'alphabet/:level',
    component: AlphabetComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
