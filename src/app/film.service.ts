import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiKey = environment.apiKey;
  
  constructor(private Http: HttpClient) {
  }
  getFilms(page:number): Observable<any> {
    return this.Http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${page}`)
  }

  getFilmsDetail(id: number): Observable<any> {
    return this.Http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
  }

  getFilmsByName(name: string, page: number): Observable<any> {
    return this.Http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${name}&page=${page}`)
  }

}
