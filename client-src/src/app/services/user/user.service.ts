import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IUser } from '../../interfaces/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = 'http://localhost:5000/api/users/';
  constructor(private http:HttpClient) { }
  getUsers():Observable<IUser> {
    return this.http.get<IUser>(this._url).pipe(catchError(error => this.errorHandler(error)))
  }
  errorHandler(error: any){
    console.log(error.message)
    return throwError(error.message)
  }
}
