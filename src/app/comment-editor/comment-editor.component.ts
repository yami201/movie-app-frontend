import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import COMMENT from 'src/types/COMMENT';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent {
  comment: string = '';
  @Input() id !: number;
  @Output() commentChange = new EventEmitter<COMMENT>();

  constructor(private userService: UserService, private httpClient: HttpClient) { }

  handleChange(event: Event) {
    this.comment = (event.target as HTMLInputElement).value;
  }

  handleSubmit(event: Event) {
    this.userService.getUser().subscribe(user => {
      const comment = {
        comment: this.comment,
        movie_id: this.id,
        email: user?.email ? user.email : "Guest"
      }
      this.commentChange.emit(comment);
      
      this.httpClient.post(`${environment.restLink}/comment`, comment).subscribe((data) => {
        console.log(data)
      })
    })
    event.preventDefault()
  }
}
