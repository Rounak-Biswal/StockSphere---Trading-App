import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistOverview } from './watchlist-overview';

describe('WatchlistOverview', () => {
  let component: WatchlistOverview;
  let fixture: ComponentFixture<WatchlistOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
