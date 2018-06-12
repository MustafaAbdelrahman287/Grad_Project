import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  result: any;

  constructor(private http: Http) {
    let token;
    if (token) {
      this.currentUser = this.result.userId;
    }
  }

  login(credentials) {
    return this.http.post('http://localhost:5000/api/Users/login', credentials)
    .pipe(map(response => {
        let result = response.json();
        console.log(result)
        if (result && result.id) {
          console.log(result, result.id);
          this.currentUser = result.userId;
          return true;
        }
        else {
          console.log(result);
          return false;
        }
      },
    ));
  }

  logout() {
    this.http.post('http://localhost:5000/api/Users/logout', this.result)
    this.currentUser = null;
    console.log(this.currentUser, this.result)
  }

  isLoggedIn() {
    return this.http.post('http://localhost:5000/api/Users/logout', this.result.id)
  }
}
