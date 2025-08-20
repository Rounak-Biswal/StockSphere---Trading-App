import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IStock } from '../../model/stock.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist-overview',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './watchlist-overview.html',
  styleUrl: './watchlist-overview.css'
})
export class WatchlistOverview implements OnInit {
  http = inject(HttpClient)

  //send selected stock to parent(dashboard)
  @Output() selectedStock = new EventEmitter<IStock>();
  selectStockToDisplay(stock: IStock) {
    this.selectedStock.emit(stock)
  }
  //-------------------------------------------

  watchlistData: IStock[] = []

  getWatchlistData() {
    this.http.get("http://localhost:5000/watchlist/all")
      .subscribe((res: any) => {
        this.watchlistData = res;
      })
  }

  //formatters
  formatNumber(value: number): string {
    const num = typeof value === 'string' ? +value : value;

    if (isNaN(num)) return 'N/A';

    if (num >= 1_000_000_000_000) {
      return (num / 1_000_000_000_000).toFixed(2) + 'T';
    } else if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + 'B';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2) + 'K';
    } else {
      return num.toFixed(2);
    }
  }

  toPercent(value: number): string {
    return value.toFixed(2)
  }

  changeTrendColor(value: number) {
    if (value < 0)
      return "text-center text-danger"
    else if (value > 0) {
      return "text-center text-success"
    }
    else
      return "text-center text-warning"
  }
  //-----------------------------------

  ngOnInit(): void {
    this.getWatchlistData()
  }
}
