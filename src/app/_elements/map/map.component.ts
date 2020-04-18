import { Component, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Input() lat: number;
  @Input() long: number;
  @Input() zoom: number;

  private map: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges() {
    if (this.map != undefined){
      this.map.off();
      this.map.remove();
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.lat, this.long ],
      zoom: this.zoom,
      scrollWheelZoom: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }); 

    var circle = L.circle([this.lat, this.long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100000
    }).addTo(this.map);

    tiles.addTo(this.map);}

}
