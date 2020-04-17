import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Covid19DataClass, HistoricalDataClass } from '../_models/covid19';

@Injectable({
  providedIn: 'root'
})
export class Covid191Service {

  urlCurrent: string = 'https://corona.lmao.ninja/v2/countries/';
  urlHistorical: string = 'https://corona.lmao.ninja/v2/historical/';

  constructor(private http: HttpClient) { }

  getCurrentData(country: string) {
    return this.http.get<Covid19DataClass>(this.urlCurrent + country);
  }

  getHistoricalData() {
    return this.http.get<HistoricalDataClass[]>(this.urlHistorical);
  }

}
