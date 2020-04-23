import { Component } from '@angular/core';
import countriesData from './_json/countries.json';
import { LiveChartComponent } from './live-chart/live-chart.component';
import { Covid19UKDataService } from './_services/covid19-uk-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coronavirus';
  countries: any = countriesData;
  selected: string;

  constructor(private covid19UKDataService: Covid19UKDataService){
    this.covid19UKDataService.getStarted();
  }

  onCountrySelected(country: string) {
    console.log(country);
  }

}
