import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import USER from 'src/types/USER';
import { getCurrentUser, logoutUser } from 'src/utils/firebase.utils';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment.prod';
@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.scss']
})
export class SearchNavComponent implements OnInit{
  user !: USER | null;
  @Output() searchFieldChange: EventEmitter<string> = new EventEmitter<string>();
  count : number = 0;
  constructor(
    private userService : UserService, 
    private router : Router,
    private httpClient : HttpClient
    ) { 
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.httpClient.get(
          `${environment.restLink}/favorite/${this.user?.uid}`).subscribe(data => {
            this.count = (data as any[]).length;
          })
      }
    )
  }

  handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchFieldChange.emit(value);
  }

  async handleSignOut() {
    await logoutUser()
    this.router.navigate(['/'])
  }
}
