import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IStock } from '../../model/stock.model';
import { CommonModule } from '@angular/common';
import { WatchlistOverview } from '../watchlist-overview/watchlist-overview';
import { Chart } from '../chart/chart';
import { PurchaseWidget } from '../purchase-widget/purchase-widget';
import { VolumeChart } from '../volume-chart/volume-chart';
import { RsiChart } from '../rsi-chart/rsi-chart';
import { MacdChart } from '../macd-chart/macd-chart';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule, CommonModule, WatchlistOverview, Chart, PurchaseWidget, VolumeChart, RsiChart, MacdChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  http = inject(HttpClient)

  selectedStock: IStock | null = null;
  onStockSelection(stock: IStock) {
    this.selectedStock = stock;
  }

  watchlistData: IStock[] = []

  getWatchlistData() {
    this.http.get("http://localhost:5000/watchlist/all")
      .subscribe((res: any) => {
        this.watchlistData = res;
        console.log(this.watchlistData)
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
