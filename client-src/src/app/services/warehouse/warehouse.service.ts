import { Injectable } from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {IWarehouse} from '../../interfaces/warehouse'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private _url="http://localhost:3000/api/warehouses";
  private _posturl="";

  constructor( private http:HttpClient) { }
  getWarehouse():Observable<IWarehouse[]>{
    return this.http.get<IWarehouse[]>(this._url).pipe(catchError(error => this.errorHandler(error)));

  }
  postWarehouse(newWarehouse:IWarehouse):Observable<IWarehouse[]>{
    return this.http.post<IWarehouse[]>(this._posturl,newWarehouse,httpOptions).pipe(catchError(error =>this.errorHandler(error)));

  }
  getWarehouseById(){}
  postWarehouseById(){}

  errorHandler(error: any){
    return throwError(error.message);
  
  }
}
