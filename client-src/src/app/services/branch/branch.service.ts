import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBranch } from '../../interfaces/branch';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private _url: string = 'http://localhost:5000/api/branches/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  })
  constructor(private http: HttpClient) { }

  getBranches(): Observable<IBranch[]> {
    return this.http.get<IBranch[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }

  getBranch(id: string): Observable<IBranch> {
    return this.http.get<IBranch>(this._url + id).pipe(catchError(error => this.errorHandler(error)));
  }

  createBranch(branch: IBranch): Observable<any> {
    return this.http.post<IBranch>(this._url, branch, this.httpOptions).pipe(catchError(error => this.errorHandler(error)));
  }

  updateBranch(branch: IBranch): Observable<any> {
    return this.http.put<IBranch>(this._url + branch.id, branch).pipe(catchError(error => this.errorHandler(error)));
  }

  removeBranch(branch: IBranch): Observable<any> {
    return this.http.delete<IBranch>(this._url + branch.id).pipe(catchError(error => this.errorHandler(error)));
  }

  errorHandler(error: any) {
    console.log(error.message);
    return throwError(error.message);
  }
}
