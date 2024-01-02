import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFilmComponent } from './list-film/list-film.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'list' , component : ListFilmComponent },
  { path: 'detail/:id', component: FilmDetailComponent},
  { path: 'favorites', component: FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
