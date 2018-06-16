import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {IWarehouse} from '../../interfaces/warehouse'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private _url="http://localhost:3000/api/warehouses";

  constructor( private http:HttpClient) { }
  getWarehouse():Observable<IWarehouse[]>{
    return this.http.get<IWarehouse[]>(this._url).pipe(catchError(error => this.errorHandler(error)));

  }
  postWarehouse(){

  }
  getWarehouseById(){}
  postWarehouseById(){}

  errorHandler(error: any){
    return throwError(error.message);
  
  }
}
