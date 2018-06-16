import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IFactory } from '../../interfaces/factory';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  private _url = 'http://localhost:5000/api/factories/';
  constructor(private http: HttpClient) { }
  getFactories(): Observable<IFactory[]> {
    return this.http.get<IFactory[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  errorHandler(error: any) {
    console.log(error.message);
    return throwError(error.message);
  }
}
