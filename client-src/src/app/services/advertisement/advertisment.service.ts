import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {IAdvertisment} from '../../interfaces/advertisment'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {
  private _url:string ="http://localhost:3000/api/adverts/"

  constructor(private http : HttpClient ) {}
  getAdvertisment():Observable<IAdvertisment[]>{
    return this.http.get<IAdvertisment[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
   
  }
errorHandler(error: any){
  return throwError(error.message);

}

}
