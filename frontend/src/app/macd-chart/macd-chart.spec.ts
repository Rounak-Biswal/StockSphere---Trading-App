import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacdChart } from './macd-chart';

describe('MacdChart', () => {
  let component: MacdChart;
  let fixture: ComponentFixture<MacdChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacdChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacdChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
