import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getCurrentUser } from 'src/utils/firebase.utils';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend-emi';

  constructor(private router : Router, private userService : UserService) {}

  async ngOnInit() {
    const user = await getCurrentUser()
    if(!user) {
      this.router.navigate(['/'])
    } else {
      this.userService.setUser({
        email: user?.email,
        uid: user?.uid
      })
      this.router.navigate(['/list'])
    }
  }
}
