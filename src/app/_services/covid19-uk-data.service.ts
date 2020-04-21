import { Injectable } from '@angular/core';
import { Covid19UKDataClass } from '../_models/covid19UK';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { format } from 'fecha';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Covid19UKDataService {

  // https://raw.githubusercontent.com/tomwhite/covid-19-uk-data/master/data/raw/phe/coronavirus-covid-19-number-of-cases-in-uk-2020-04-18.json

  urlCovid19UKData: string = 'https://raw.githubusercontent.com/tomwhite/covid-19-uk-data/master/data/raw/phe/coronavirus-covid-19-number-of-cases-in-uk-';

  date = new Date();
  todaysFormattedDate: string;
  yesterdaysFormattedDate: string;
  covid19UKData$: Observable<any>;
  disclaimer: string;
  lastUpdatedAt: string;

  countryCode = ['E92000001', 'S92000003', 'N92000002', 'W92000004'];
  countryName = ['england', 'scotland', 'ni', 'wales'];

  UK = {
    disclaimer: '',
    lastUpdatedAt: '',
    overview: {},
    countries: {
      england: {},
      scotland: {},
      ni: {},
      wales: {},
    },
    regions: {
      westMidlands: {},
      eastOfEngland: {},
      northWest: {},
      eastMidlands: {},
      southWest: {},
      london: {},
      yorkshireAndTheHumber: {},
      northEast: {},
      southEast: {},
   }
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getDates();
    this.getAllCovid19UKData(this.todaysFormattedDate)
   }

  getAllCovid19UKData(dateForUrl: string) {
    this.http.get<Covid19UKDataClass>(this.urlCovid19UKData + dateForUrl + '.json')
      .subscribe(
        allUKData => {
          console.log('allUKData 1', allUKData);

          this.covid19UKData$ = of(allUKData);
          console.log('allUKData 2', this.covid19UKData$);

          this.updateData(allUKData);          

        },
        err => {
          if (err.status === 404) {
            this.snackBar.open('Public Health England have not updated todays data yet, so using current latest data (yestrtday)!', 'close', {
              duration: 5000,
            });
            this.getAllCovid19UKData(this.yesterdaysFormattedDate);
          }
        }
      );
  }

  getDates() {
    this.todaysFormattedDate = format(new Date(), 'YYYY-MM-DD');
    this.yesterdaysFormattedDate = format(new Date(this.date.setDate(this.date.getDate() -1)), 'YYYY-MM-DD');
  }

  updateData(UKData: any) {
    this.UK.disclaimer = UKData.disclaimer;
    this.UK.lastUpdatedAt = UKData.lastUpdatedAt;
    this.UK.overview = UKData.overview.K02000001;

    this.updateUKCountries(UKData.countries);
    this.updateUKRegions(UKData.regions);

    console.log('UK', this.UK);
    
    let totalDeathsInUK = 
    this.UK.countries.england['deaths'].value + 
    this.UK.countries.scotland['deaths'].value + 
    this.UK.countries.ni['deaths'].value + 
    this.UK.countries.wales['deaths'].value;

    console.log('totalDeathsInUK', totalDeathsInUK);
  }

  updateUKCountries(countries: any) {
    this.UK.countries.england = Object.assign(countries.E92000001);
    this.UK.countries.scotland = Object.assign(countries.S92000003);
    this.UK.countries.ni = Object.assign(countries.N92000002);
    this.UK.countries.wales = Object.assign(countries.W92000004);
  }

  updateUKRegions(regions: any) {
    this.UK.regions.westMidlands = Object.assign(regions.E12000005);
    this.UK.regions.eastOfEngland = Object.assign(regions.E12000006);
    this.UK.regions.northWest = Object.assign(regions.E12000002);
    this.UK.regions.eastMidlands = Object.assign(regions.E12000004);
    this.UK.regions.southWest = Object.assign(regions.E12000009);
    this.UK.regions.london = Object.assign(regions.E12000007);
    this.UK.regions.yorkshireAndTheHumber = Object.assign(regions.E12000003);
    this.UK.regions.northWest = Object.assign(regions.E12000001);
    this.UK.regions.southEast = Object.assign(regions.E12000008);
  }
}
