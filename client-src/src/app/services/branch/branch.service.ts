import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBranch } from '../../branch';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private _url:string = 'http://localhost:5000/api/branches/';
  constructor(private http:HttpClient) { }

  getBranches(): Observable<IBranch[]> {
    return this.http.get<IBranch[]>(this._url)
  }
  postBranches() {
    
  }
}
