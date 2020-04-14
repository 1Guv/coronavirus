import { Component } from '@angular/core';
import countriesData from './_json/countries.json';
import { LiveChartComponent } from './live-chart/live-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coronavirus';
  countries: any = countriesData;

  constructor(){}

  onCountrySelected(country: string) {
    console.log(country);
  }

}
