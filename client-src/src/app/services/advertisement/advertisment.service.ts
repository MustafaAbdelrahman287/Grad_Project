import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IAdvertisment } from '../../interfaces/advertisment'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {
  private _url: string = "http://localhost:5000/api/adverts/"

  constructor(private http: HttpClient) { }
  getAdvertisment(): Observable<IAdvertisment[]> {
    return this.http.get<IAdvertisment[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  postAdvertisment(newAdvertisment:IAdvertisment):Observable<any>{
    return this.http.post<IAdvertisment>(this._url,newAdvertisment,httpOptions).pipe(catchError(error => this.errorHandler(error)));

  }

  errorHandler(error: any) {
    return throwError(error.message || 'Server Error');
  }

}
