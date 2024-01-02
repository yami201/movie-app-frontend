import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MOVIE from 'src/types/MOVIE';
import { FilmService } from '../film.service';
import { mapMovie } from 'src/utils/mapMovie';
import { HttpClient } from '@angular/common/http';
import COMMENT from 'src/types/COMMENT';
import { UserService } from '../user.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  film !: MOVIE ;
  comments: COMMENT[] = [];
  showFavMessage: boolean = false;
  isFavorite: boolean = false;
  

  constructor(
    private route: ActivatedRoute, 
    private filmService: FilmService,
    private httpClient: HttpClient,
    private userService: UserService,) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.filmService.getFilmsDetail(id).subscribe(film => {
      this.film = mapMovie(film)
    })
    this.httpClient.get(`${environment.restLink}/comment?movie_id=${id}`).subscribe(
      (data) => {
        this.comments = data as COMMENT[]
      }
    )
    this.userService.getUser().subscribe(user => {
      this.httpClient.get(`${environment.restLink}/favorite/${user?.uid}/${id}`).subscribe(
        (data) => {
          this.isFavorite = data as boolean
        }
      )
    })
  }

  onCommentChange(comment: COMMENT) {
    this.comments.push(comment)
  }
  addToFavorites(film: MOVIE) {
    this.userService.getUser().subscribe(user => {
      if (!user?.email) {
        this.showFavMessage = true;
        window.setTimeout(() => {
          this.showFavMessage = false;
        }, 4000)
      } else {
        this.httpClient.post('${environment.restLink}/favorite', {
          user_id: user?.uid,
          movie_id: film.id,
        }).subscribe(() => {
          this.isFavorite = !this.isFavorite;
        })
      }
    })
  }
}
