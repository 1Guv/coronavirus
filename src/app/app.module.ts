import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Covid19PerCountryComponent } from './covid-19-per-country/covid-19-per-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material/all-angular-material-modules';
import { MapComponent } from './_elements/map/map.component';
import { CountoModule }  from 'angular2-counto';
import { Covid19CountryHistoryComponent } from './_elements/covid19-country-history/covid19-country-history.component';
import { ColumnChartComponent } from './_elements/charts/column-chart/column-chart.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    AppComponent,
    Covid19PerCountryComponent,
    MapComponent,
    Covid19CountryHistoryComponent,
    ColumnChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CountoModule,
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
