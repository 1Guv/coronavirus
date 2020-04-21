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

  UK = {
    disclaimer: '',
    lastUpdatedAt: '',
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

          this.UK.disclaimer = allUKData.disclaimer;
          this.UK.lastUpdatedAt = allUKData.lastUpdatedAt;

          console.log('this.disclaimer', this.UK.disclaimer);
          console.log('this.lastUpdatedAt', this.UK.lastUpdatedAt);
          

          // this.covid19UKData$ = of(allUKData);
          // console.log('allUKData 2', this.covid19UKData$);

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
}
