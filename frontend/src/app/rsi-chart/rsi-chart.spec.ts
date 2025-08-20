import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsiChart } from './rsi-chart';

describe('RsiChart', () => {
  let component: RsiChart;
  let fixture: ComponentFixture<RsiChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsiChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsiChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
