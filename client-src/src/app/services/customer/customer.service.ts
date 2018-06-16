import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICustomer } from 'src/app/interfaces/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _url="http://localhost:3000/api/customers";
  

  constructor(private http:HttpClient) { }
  getCustomer():Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  postCustomer(){
    
      }
      getCustomerById(){}
      postCustomerById(){}

  errorHandler(error:any){
    return throwError(error.message)
  }
}
