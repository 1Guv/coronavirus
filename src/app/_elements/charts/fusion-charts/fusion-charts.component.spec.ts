import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FusionChartsComponent } from './fusion-charts.component';

describe('FusionChartsComponent', () => {
  let component: FusionChartsComponent;
  let fixture: ComponentFixture<FusionChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ FusionChartsComponent ]
    })
   component = TestBed.get(FusionChartsComponent);
  }));

  it('should create Fusion Chart', () => {
    expect(component).toBeTruthy();
  });
});
