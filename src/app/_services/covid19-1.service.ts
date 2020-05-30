import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Covid19DataClass, HistoricalDataClass } from '../_models/covid19';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Covid191Service {

  url : string = 'https://corona.lmao.ninja/v2/';

  constructor(private http: HttpClient) { }

  getCurrentData(country: string): Observable<Covid19DataClass> {
    return this.http.get<Covid19DataClass>(this.url + 'countries/' + country);
  }

  getHistoricalData(): Observable<HistoricalDataClass[]> {
    return this.http.get<HistoricalDataClass[]>(this.url + 'historical/');
  }
}
