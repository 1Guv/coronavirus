import { Component } from '@angular/core';
import countriesData from './_json/countries.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coronavirus';
  countries: any = countriesData;
  selected: string;

  constructor(){
  }

  onCountrySelected(country: string) {
    console.log(country);
  }

}
