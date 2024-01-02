import { Component, Input } from '@angular/core';
import MOVIE from 'src/types/MOVIE';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss']
})
export class FilmItemComponent {
  @Input() film !: MOVIE
}
