import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http/src/client';
import {IAdvertisment} from '../../interfaces/advertisment'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {
  private _url:string ="http://localhost:3000/api/adverts/"

  constructor(private http : HttpClient ) {}
  getAdvertisment():Observable<IAdvertisment[]>{
    return this.http.get<IAdvertisment[]>(this._url);
  }

}
