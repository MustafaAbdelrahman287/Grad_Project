import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {
  private _url = '../../../../assets/districts.geojson';
  constructor(private http: HttpClient) { }
  getDistricts(): Observable<any> {
    return this.http.get(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  errorHandler(error: any) {
    console.log(error.message);
    return throwError(error.message);
  }
}
