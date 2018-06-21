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
interval = 3000;
headers = new HttpHeaders({'Accept':'application/json; charset=utf-8'})
  constructor(private http:HttpClient) { }
  getIsochrones(locations:string, profile:string):Observable<any>{
    return this.http.get( 'https://api.openrouteservice.org/isochrones?api_key=58d904a497c67e00015b45fce44bb689a2de48219930cf1e2c911224&locations= 31.198069%2C30.091041%7C30.118000%2C31.202017&profile=foot-walking&range_type=distance&range=100&interval=1000&units=m&location_type=start&attributes=reachfactor&intersections=true' /* this._url + 'api_key='+ this.token +'&locations='+ location +'&profile='+ profile +'&range_type='+ this.range_type +'&range=100&interval='+ this.interval +'&units=m&location_type='+ this.location_type +'&attributes=reachfactor&intersections=true' */)
    .pipe(catchError(error => this.errorHandler(error)));
  }
  errorHandler(error: any){
    return throwError(error.message);
  }

}
