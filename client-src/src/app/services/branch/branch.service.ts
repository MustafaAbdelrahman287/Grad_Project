import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBranch } from '../../interfaces/branch';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private _url: string = 'http://localhost:5000/api/branches/';
  constructor(private http: HttpClient) { }

  getBranches(): Observable<IBranch[]> {
    return this.http.get<IBranch[]>(this._url).pipe(map(res => { return res }),
      catchError(error => this.errorHandler(error))
    );
  }
  postBranches() {

  }

  errorHandler(error: any) {
    console.log(error.message);
    return throwError(error.message);
  }
}
