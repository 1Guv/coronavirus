import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Covid19UKDataService } from '../_services/covid19-uk-data.service';

@Component({
  selector: 'app-covid19-uk-stats',
  templateUrl: './covid19-uk-stats.component.html',
  styleUrls: ['./covid19-uk-stats.component.scss']
})
export class Covid19UKStatsComponent implements OnInit, AfterContentInit {

  uK = {};

  constructor(private covid19UKDataService: Covid19UKDataService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.uK = this.covid19UKDataService.UK;
  }

}
