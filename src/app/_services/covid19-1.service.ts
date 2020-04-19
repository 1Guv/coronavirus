import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Covid19DataClass, HistoricalDataClass } from '../_models/covid19';
import { Covid19UKDataClass } from '../_models/covid19UK';

@Injectable({
  providedIn: 'root'
})
export class Covid191Service {

  urlCurrent: string = 'https://corona.lmao.ninja/v2/countries/';
  urlHistorical: string = 'https://corona.lmao.ninja/v2/historical/';
  urlCovid19UKData: string = 'https://raw.githubusercontent.com/tomwhite/covid-19-uk-data/master/data/raw/phe/coronavirus-covid-19-number-of-cases-in-uk-2020-04-18.json';

  constructor(private http: HttpClient) { }

  getCurrentData(country: string) {
    return this.http.get<Covid19DataClass>(this.urlCurrent + country);
  }

  getHistoricalData() {
    return this.http.get<HistoricalDataClass[]>(this.urlHistorical);
  }

  getAllCovid19UKData() {
    return this.http.get<Covid19UKDataClass[]>(this.urlCovid19UKData);
  }

}
