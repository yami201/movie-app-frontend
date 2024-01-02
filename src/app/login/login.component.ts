import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { 
  loginUser, 
  signInWithGoogle, 
  signInAnonymouslyUser,
  registerUser
} from 'src/utils/firebase.utils'; 
import { User } from 'firebase/auth';
import { environment } from 'src/environment/environment.prod';

type FormFields = {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formFields !: FormFields;
  errorMessage !: string;

  constructor(
    private http : HttpClient, 
    private userService : UserService,
    private router : Router) {}

  handleChange(event: Event, field : string) {
    const value = (event.target as HTMLInputElement).value;
    this.formFields = {
      ...this.formFields,
      [field]: value
    }
  }

  async handleSubmit(event : Event) {
    try {
      event.preventDefault()
      if(!this.formFields ||!this.formFields.email || !this.formFields.password) {
        this.errorMessage = 'Please fill in all the fields'
        return
      }
      this
        .http.get(`${environment.restLink}/user?email=${this.formFields.email}`)
        .subscribe(async (response : any) => {
          let currentUser: User | undefined;
          if(response){
            const result = await loginUser(this.formFields.email, this.formFields.password)
            currentUser = result?.user
          } else {
            const result = await registerUser(this.formFields.email, this.formFields.password)
            currentUser = result?.user
          }
          this.http.post(`${environment.restLink}/user`, {
              email: currentUser?.email,
              uid: currentUser?.uid,
              password: this.formFields.password
          }).subscribe(()  => {
            this.userService.setUser({
              email: currentUser?.email,
              uid: currentUser?.uid,
              password: this.formFields.password
            })
            this.router.navigate(['list'])
          })
        })
    } catch (error : any) {
      this.errorMessage = error?.message
    }
  }

  async handleGoogleLogin(event : Event) {
    event.preventDefault()
    await signInWithGoogle()
    this.router.navigate(['list'])
  }

  async handleAnonymousLogin() {
    const result = await signInAnonymouslyUser()
    this.userService.setUser({
      email: result?.user?.email,
      uid: result?.user?.uid,
      password: ''
    })
    this.router.navigate(['list'])
  }
}
