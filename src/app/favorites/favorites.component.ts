import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import MOVIE from 'src/types/MOVIE';
import { FilmService } from '../film.service';
import { mapMovie } from 'src/utils/mapMovie';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{
  films: MOVIE[] = [];
  constructor(
    private userService : UserService, 
    private httpClient : HttpClient,
    private filmService : FilmService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (data) => {
        this.httpClient.get(
          `${environment.restLink}/favorite/${data?.uid}`).subscribe(data => {
            const movies = data as any[]
            movies.forEach(movie => {
              this.filmService.getFilmsDetail(movie.movie_id).subscribe(film =>{
                this.films.push(mapMovie(film))
              })
            })
          })
      }
    )
  }

}
