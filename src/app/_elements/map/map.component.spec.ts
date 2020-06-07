import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ MapComponent ]
      providers: [
        MapComponent
      ]
    })
    
    component = TestBed.get(MapComponent);
  }));

  it('should create map', () => {
    expect(component).toBeTruthy();
  });
});
