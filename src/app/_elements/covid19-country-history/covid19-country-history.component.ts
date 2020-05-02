import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-covid19-country-history',
  templateUrl: './covid19-country-history.component.html',
  styleUrls: ['./covid19-country-history.component.scss']
})
export class Covid19CountryHistoryComponent implements OnInit {

  @Input() data: any;
  @Input() title: string;
  @Input() divName: string;

  constructor() { }

  ngOnInit() {
  }

}
