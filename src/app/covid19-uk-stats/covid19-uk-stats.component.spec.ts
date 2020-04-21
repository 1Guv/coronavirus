import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19UKStatsComponent } from './covid19-uk-stats.component';

describe('Covid19UKStatsComponent', () => {
  let component: Covid19UKStatsComponent;
  let fixture: ComponentFixture<Covid19UKStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Covid19UKStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19UKStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
