import { TestBed, async } from '@angular/core/testing';
import { Covid191Service } from './covid19-1.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Covid19DataClass, HistoricalDataClass } from '../_models/covid19';

describe('Covid191Service', () => {

  let component: Covid191Service;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ Covid191Service ]
    })
    component = TestBed.get(Covid191Service);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get covid-19 UK data', () => {
    component.getCurrentData('UK')
      .subscribe(countries => {
        expect(countries).toBeTruthy('No countries returned');
      });

      const req = httpTestingController.expectOne('https://corona.lmao.ninja/v2/countries/UK');
      expect(req.request.method).toEqual("GET");
      req.flush({payload: Object.values(Covid19DataClass)});
  })

  it('should get covid-19 historical data', () => {
    component.getHistoricalData()
      .subscribe(history => {
        expect(history).toBeTruthy('No history returned');
      });

      const req = httpTestingController.expectOne('https://corona.lmao.ninja/v2/historical/');
      expect(req.request.method).toEqual("GET");
      req.flush({payload: Object.values(HistoricalDataClass)});
  })

  afterEach(() => {
    // Making sure that no other http request is accidentally being made
    httpTestingController.verify();
  })
});
