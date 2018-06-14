import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICompetitor } from '../../interfaces/competitor';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetitorService {
  private _url: string = 'http://localhost:5000/api/competitors/';
  constructor(private http: HttpClient) { }

  getCompetitors(): Observable<ICompetitor[]> {
    return this.http.get<ICompetitor[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  postCompetitors() {

  }

  errorHandler(error: any) {
    console.log(error.message);
    return throwError(error.message);
  }
}
