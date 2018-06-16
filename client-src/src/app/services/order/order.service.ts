import { Injectable } from '@angular/core';
import { IOrder } from '../../interfaces/order';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _url = 'http://localhost:5000/api/orders/';
  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this._url).pipe(catchError(error => this.errorHandler(error)));
  }

  errorHandler(error: any) {
    console.log(error.message);
    return throwError(error.message);
  }
}
