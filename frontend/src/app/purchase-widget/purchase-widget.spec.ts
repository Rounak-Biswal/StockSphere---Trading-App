import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseWidget } from './purchase-widget';

describe('PurchaseWidget', () => {
  let component: PurchaseWidget;
  let fixture: ComponentFixture<PurchaseWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
