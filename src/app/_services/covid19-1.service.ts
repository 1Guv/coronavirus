import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Covid191Service {

  urlUK: string = 'https://corona.lmao.ninja/countries/UK';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.urlUK);
  }

}
