import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {IItem} from '../../interfaces/item'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _url="http://localhost:5000/api/items";

  constructor( private http:HttpClient) { }
  getItem():Observable<IItem[]>{
    return this.http.get<IItem[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  postItem(){
    
      }
      getItemById(){}
      postItemById(){}
  errorHandler(error: any){
    return throwError(error.message);
  
  }
}
