import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Covid191Service } from '../_services/covid19-1.service';
import { Covid19DataClass, TimeLineClass, HistoricalDataClass } from '../_models/covid19';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Covid19UKDataClass } from '../_models/covid19UK';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
  countriesInUK$;
  regionsInUK$: Observable<any[]>;
  covid19UKData$: Observable<any>;

  arrayOfUKCountries = [];

  constructor(
    private covid19: Covid191Service, 
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.covid19.getAllCovid19UKData()
    // .subscribe( (data: Covid19UKDataClass[]) => {
    //   console.log('All UK Data', data);
    // })

    this.covid19UKData$ = this.covid19.getAllCovid19UKData()
      .pipe(
        shareReplay(1)
    );

    this.covid19UKData$.subscribe(
      allUKData => {
        console.log('all', allUKData);
      }
    );

    this.covid19UKData$.subscribe(
      allUKData => {
        // need to map over the object and not use E92000001 etc
        // this.arrayOfUKCountries.push(Object.assign({}, allUKData.countries.E92000001));
        // this.arrayOfUKCountries.push(Object.assign({}, allUKData.countries.S92000003));
        // this.arrayOfUKCountries.push(Object.assign({}, allUKData.countries.N92000002));
        // this.arrayOfUKCountries.push(Object.assign({}, allUKData.countries.W92000004));

        [...Object.entries(allUKData.countries)].forEach(element => {
          console.log('element', element);
          [...Object.entries(element[1])].forEach(e => {
            console.log('e', e[0], e[1].value);
            this.arrayOfUKCountries.push(Object.assign({}, e[1]));
          })
        });
      }
    )

    console.log('arrayOfUKCountries', this.arrayOfUKCountries);

    this.countriesInUK$ = of(this.arrayOfUKCountries);
    console.log('this.countriesInUK$', this.countriesInUK$);

    this.covid19UKData$.subscribe(
      allUKData => {
        this.regionsInUK$ = allUKData.regions;
        console.log('regions', this.regionsInUK$);
      }
    )
    

    // console.log('countriesInUK >', this.countriesInUK$);
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
    this.covid19.getCurrentData(country)
    .subscribe( 
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
