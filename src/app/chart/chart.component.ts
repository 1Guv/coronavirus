import { Component, OnInit } from '@angular/core';
import { Covid191Service } from '../_services/covid19-1.service';
import { Covid19DataClass, TimeLineClass, HistoricalDataClass } from '../_models/covid19';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  currentUKData: Covid19DataClass;
  historicalData: HistoricalDataClass;
  ukTimeline: TimeLineClass;
  country: string = 'Spain';
  countryHistory: TimeLineClass;

  constructor(private covid19: Covid191Service ) { }

  ngOnInit() {
    this.getLiveUKCovid19Data();

    this.covid19.getHistoricalData()
    .subscribe(
      (history: HistoricalDataClass[]) => {
      this.getHistoricalData(history, this.country);
    })
  }

  getHistoricalData(history: HistoricalDataClass[], country: string) {
    console.log('history', history);
    
    // For UK need to check province is null otherwise it will get provinces in Bermuda, Caymann Islands and Channel Islands etc
    if (country === 'UK') {
      history.forEach(element => {
        if (element.country === 'UK' && element.province === null) {
          this.ukTimeline = element.timeline;
          console.log('UK Timeline', this.ukTimeline);
        }
      });
    } else {
      // This works for all other countries which dont have a province eg Italy, USA and Spain
      history.forEach(element => {
        if (element.country === country) {
          this.countryHistory = element.timeline;
          console.log(this.country, this.countryHistory);
        }
      })
    }
    
  }

  getLiveUKCovid19Data() {
    this.covid19.getCurrentUKData().subscribe( data => {
      this.currentUKData = data;
      console.log('ukData', this.currentUKData);
    })
  }

} 
