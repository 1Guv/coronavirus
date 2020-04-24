import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19PerCountryComponent } from './covid-19-per-country.component';

describe('Covid19PerCountryComponent', () => {
  let component: Covid19PerCountryComponent;
  let fixture: ComponentFixture<Covid19PerCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Covid19PerCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19PerCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
