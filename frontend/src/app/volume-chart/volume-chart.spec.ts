import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeChart } from './volume-chart';

describe('VolumeChart', () => {
  let component: VolumeChart;
  let fixture: ComponentFixture<VolumeChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
