import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISurvey } from 'src/app/interfaces/survey';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private _url: string = 'http://localhost:5000/api/surveys';

  constructor(private http: HttpClient) { }
  getSurvey():Observable<ISurvey[]>{
    return this.http.get<ISurvey[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  errorHandler(error:any){
    return throwError(error.message)
  }
}
