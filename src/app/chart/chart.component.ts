import { Component, OnInit } from '@angular/core';
import { Covid191Service } from '../_services/covid19-1.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  ukData: object;

  constructor(private covid19: Covid191Service ) { }

  ngOnInit() {
    this.ukData = this.covid19.getData().subscribe( data => {
      this.ukData = data;
      console.log('data', data);
    })
  }

}
