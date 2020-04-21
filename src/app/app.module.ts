import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LiveChartComponent } from './live-chart/live-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material/all-angular-material-modules';
import { MapComponent } from './_elements/map/map.component';
import { CountoModule }  from 'angular2-counto';
import { Covid19UKStatsComponent } from './covid19-uk-stats/covid19-uk-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveChartComponent,
    MapComponent,
    Covid19UKStatsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CountoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
