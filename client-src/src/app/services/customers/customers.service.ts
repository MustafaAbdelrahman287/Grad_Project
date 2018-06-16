import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICustomer } from '../../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _url: string = 'http://localhost:5000/api/customers/';
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }
  postBranches() {

  }

  errorHandler(error: any) {
    console.log(error.message);
    return throwError(error.message);
  }
}
