import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsochronesService {
_url = 'https://isoline.route.cit.api.here.com/routing/7.2/calculateisoline.json?';
app_id = '0MpxHZLlXNolFqbgkXJ0';
app_code = 'KlPu68OWLGrJVWfo6UGRBw'
  constructor(private http:HttpClient) { }
  getIsochrones(locations:string):Observable<any>{
    return this.http.get(this._url + '?app_id='+ this.app_id +'&app_code='+ this.app_code +'&mode=shortest;car;traffic:disabled&start=geo!'+ locations +'&range=4000&rangetype=distance')
    .pipe(catchError(error => this.errorHandler(error)));
  }
  errorHandler(error: any){
    return throwError(error.message);
  }
}
