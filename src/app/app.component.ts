import { Component } from '@angular/core';
import countriesData from './_json/countries.json';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coronavirus';
  countries: any = countriesData;
  selected: string;

  constructor(private scrollToService: ScrollToService){
  }

  onCountrySelected(country: string) {
    console.log(country);

    const config: ScrollToConfigOptions = {
      target: 'destination'
    };

    this.scrollToService.scrollTo(config);
  }

}
