import { Component, OnInit } from '@angular/core';
import MOVIE from 'src/types/MOVIE';
import { FilmService } from '../film.service';
import { mapMovie } from 'src/utils/mapMovie';

@Component({
  selector: 'app-list-film',
  templateUrl: './list-film.component.html',
  styleUrls: ['./list-film.component.scss']
})


export class ListFilmComponent implements OnInit {
  page : number = 1;
  films: MOVIE[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.fetchFilms(null)
  }

  mapFilms(films: any) : MOVIE[] {
    return films.map(mapMovie)
  }

  onSearchFieldChange(event : string | null) : void {
    this.page = 1;
    this.fetchFilms(event)
  }

  fetchFilms(searchField : string | null) {
    if(searchField){
      this.filmService.getFilmsByName(searchField,this.page).subscribe(films => {
        this.films = this.mapFilms(films.results)
      })
    } else {
      this.filmService.getFilms(this.page).subscribe(films => {
        this.films = this.mapFilms(films.results)
      })
    }
  }

  getNextPage() {
    this.page++;
    this.fetchFilms(null)
  }

  getPreviousPage() {
    if(this.page === 1) return;
    this.page--;
    this.fetchFilms(null)
  }
  
  
}
