import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Covid19DataClass, HistoricalDataClass } from '../_models/covid19';

@Injectable({
  providedIn: 'root'
})
export class Covid191Service {

  urlCurrentUK: string = 'https://corona.lmao.ninja/countries/UK';
  urlHistorical: string = 'https://corona.lmao.ninja/v2/historical/';

  constructor(private http: HttpClient) { }

  getCurrentUKData() {
    return this.http.get<Covid19DataClass>(this.urlCurrentUK);
  }

  getHistoricalData() {
    return this.http.get<HistoricalDataClass[]>(this.urlHistorical);
  }

}
