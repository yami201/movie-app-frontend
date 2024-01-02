import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import USER from 'src/types/USER';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<USER | null>(null);
  user$ = this.userSubject.asObservable();

  getUser() : Observable<USER | null> {
    return this.user$;
  }

  setUser(user: any) {
    this.userSubject.next({...user});
  }
}
