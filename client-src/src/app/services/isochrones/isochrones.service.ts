import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsochronesService {
_url = 'https://api.openrouteservice.org/isochrones?';
token = '58d904a497c67e00015b45fce44bb689a2de48219930cf1e2c911224';
range_type = 'distance';
location_type = 'start';
units = 'm';
interval = 20000;
headers = new HttpHeaders({'Accept':'application/json; charset=utf-8'})
  constructor(private http:HttpClient) { }
  getIsochrones(locations:string, profile:string):Observable<any>{
    return this.http.get(this._url + 'api_key='+ this.token +'&locations=8.34234%2C48.23424&profile=driving-car&range_type='+ this.range_type +'&range=100&interval='+ this.interval +'&units=m&location_type='+ this.location_type +'&attributes=reachfactor&intersections=true')
    .pipe(catchError(error => this.errorHandler(error)));
  }
  errorHandler(error: any){
    return throwError(error.message);
  }

}
