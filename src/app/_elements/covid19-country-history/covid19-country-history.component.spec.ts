import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19CountryHistoryComponent } from './covid19-country-history.component';

describe('Covid19CountryHistoryComponent', () => {
  let component: Covid19CountryHistoryComponent;
  let fixture: ComponentFixture<Covid19CountryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Covid19CountryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19CountryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
