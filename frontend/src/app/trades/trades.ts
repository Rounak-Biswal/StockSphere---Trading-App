import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IStock } from '../../model/stock.model'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trades',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './trades.html',
  styleUrl: './trades.css'
})
export class Trades implements OnInit {
  http = inject(HttpClient)
  allStockData: IStock[] = []

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.http.get("http://localhost:5000/stock/all")
      .subscribe((res: any) => {
        this.allStockData = res
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
    // let val = parseFloat(value)
    if (value < 0)
      return "text-center text-danger"
    else if (value > 0) {
      return "text-center text-success"
    }
    else
      return "text-center text-warning"
  }

}
