import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFilmComponent } from './list-film/list-film.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmService } from './film.service';
import { HttpClientModule } from '@angular/common/http';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    ListFilmComponent,
    FilmItemComponent,
    FilmDetailComponent,
    CommentEditorComponent,
    CustomButtonComponent,
    SearchNavComponent,
    LoginComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    NgxEditorModule,
  ],
  providers: [FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
