import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Covid191Service } from '../_services/covid19-1.service';
import { Covid19DataClass, TimeLineClass, HistoricalDataClass } from '../_models/covid19';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-live-chart',
  templateUrl: './live-chart.component.html',
  styleUrls: ['./live-chart.component.scss']
})
export class LiveChartComponent implements OnInit, OnChanges {

  @Input() country: string;
  currentLiveCovid19Data: Covid19DataClass;
  historicalData: HistoricalDataClass;
  countryTimeline: TimeLineClass;
  countryHistory: TimeLineClass;
  counto: any;
  // country: string;

  constructor(
    private covid19: Covid191Service, 
    private snackBar: MatSnackBar) { }

  ngOnInit() {}

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
          this.countryTimeline = element.timeline;
        }
      });
    } else {
      // This works for all other countries which dont have a province eg Italy, USA and Spain
      history.forEach(element => {
        if (element.country === country) {
          this.countryHistory = element.timeline;
        }
      })
    }
    
  }

  getLiveCovid19Data(country: string) {
    this.covid19.getCurrentData(country).subscribe( 
      data => {
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

} 
