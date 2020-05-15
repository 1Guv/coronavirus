import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-fusion-charts',
  templateUrl: './fusion-charts.component.html',
  styleUrls: ['./fusion-charts.component.scss']
})
export class FusionChartsComponent implements OnInit, OnChanges {

  dataSource: Object;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if (this.data) {
      const dataSource = {
        chart: {
          caption: 'Deaths',
          subCaption: '',
          xAxisName: 'Days',
          yAxisName: 'Deaths',
          // numberSuffix: 'K',
          theme: 'fusion'
        },
        data: this.data
      }
      this.dataSource = dataSource;
    }
  }

}
