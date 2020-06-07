import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Covid19PerCountryComponent } from './covid-19-per-country.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('Covid19PerCountryComponent', () => {
  let component: Covid19PerCountryComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [ Covid19PerCountryComponent ]
    })
    component = TestBed.get(Covid19PerCountryComponent);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should turn an object into an array of objects to send to FusionCharts', () => {
    const testObj = {test1: 10, test2: 69};
    const testArr = [{date: 'test1', deaths: 10}, {date: 'test2', deaths: 69}];
    const result = component.turnObject2Array(testObj);
    console.log('result', result);
    expect(result).toEqual(testArr, 'unexpected array result');
  });
});
