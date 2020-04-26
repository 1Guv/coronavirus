import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Covid191Service } from '../_services/covid19-1.service';
import { Covid19DataClass, TimeLineClass, HistoricalDataClass } from '../_models/covid19';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { array, keyboard } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-covid-19-per-country',
  templateUrl: './covid-19-per-country.component.html',
  styleUrls: ['./covid-19-per-country.component.scss']
})
export class Covid19PerCountryComponent implements OnInit, OnChanges {

  @Input() country: string;
  currentLiveCovid19Data: Covid19DataClass;
  historicalData: HistoricalDataClass;
  countryHistory: TimeLineClass;
  
  countryDeathsArray = [];
  countryDeathsPerDayArray = [];

  countryCasesArray = [];
  countryRecoveredArray = [];
  counto: any;

  constructor(
    private covid19: Covid191Service,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if (this.country) {
      this.getLiveCovid19Data(this.country);

      this.covid19.getHistoricalData()
      .subscribe(
        (history: HistoricalDataClass[]) => {
          this.getHistoricalDataForCountry(history, this.country);
      })
    }
  }

  getHistoricalDataForCountry(history: HistoricalDataClass[], country: string) {
    
    // For UK need to check province is null otherwise it will get provinces in Bermuda, Caymann Islands and Channel Islands etc
    if (country === 'UK') {
      history.forEach(element => {
        if (element.country === 'UK' && element.province === null) {
          this.countryHistory = element.timeline;
          // console.log('UK History', this.countryHistory);
        }
      });
    } else {
      // This works for all other countries which dont have a province eg Italy, USA and Spain
      history.forEach(element => {
        if (element.country === country) {
          this.countryHistory = element.timeline;
          // console.log('Country History', this.countryHistory);
        }
      })
    }
    this.countryDeathsArray = this.turnObject2Array(this.countryHistory.deaths);
    this.countryCasesArray = this.turnObject2Array(this.countryHistory.cases);
    this.countryRecoveredArray = this.turnObject2Array(this.countryHistory.recovered);

    this.countryDeathsPerDayArray = this.calcDeathsPerDay(this.countryDeathsArray);
    // console.log('this.countryDeathsPerDayArray', this.countryDeathsPerDayArray);
  }

  getLiveCovid19Data(country: string) {
    this.covid19.getCurrentData(country)
    .subscribe( 
      data => {
        // console.log('country', data);
        this.currentLiveCovid19Data = data;
      },
        (err: HttpErrorResponse) => {
          let currentHttpErrorMessage = err.error.message
          this.snackBar.open(currentHttpErrorMessage, 'close', {
            duration: 2000,
          });
        }
      )
  }

  turnObject2Array(currentObject: object) {
    const newArray = [];
    Object.entries(currentObject).map(([key, val]) => {
      newArray.push({date: key, deaths: val});
    })
    return newArray;
  }

  calcDeathsPerDay(totalsPerDay: any) {
    const perDay = [];
    let day: number;

    for (let i=1; i<totalsPerDay.length; i++) {
      day = totalsPerDay[i].deaths - totalsPerDay[i-1].deaths;
      perDay.push({date: totalsPerDay[i].date, deaths: day, day: i});
    }
    return perDay;
  }

} 
