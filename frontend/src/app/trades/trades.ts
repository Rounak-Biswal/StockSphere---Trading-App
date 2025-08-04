import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IStock } from '../../model/stock.model'
import { CommonModule } from '@angular/common';
import { signal, computed } from '@angular/core';

@Component({
  selector: 'app-trades',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './trades.html',
  styleUrl: './trades.css'
})
export class Trades implements OnInit {
  http = inject(HttpClient)
  allStockData: IStock[] = []
  watchlist = signal<IStock[]>([]);
  hoveredStock: IStock | null = null

  ngOnInit(): void {
    this.getData()
    this.getWatchlistData()
  }

  //get all stock data
  getData() {
    this.http.get("http://localhost:5000/stock/all")
      .subscribe((res: any) => {
        this.allStockData = res
      })
  }

  //get all watchlist data
  getWatchlistData() {
    this.http.get("http://localhost:5000/watchlist/all")
      .subscribe((res: any) => {
        // this.watchlist = res
        this.watchlist.set(res);
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
  //------------------

  //hovering actions & effects
  addToHoveredStock(stock: IStock) {
    this.hoveredStock = stock;
  }

  removeFromHoveredStock() {
    this.hoveredStock = null;
  }
  //------------------------------

  //watchlist management
  getStarColor(stock: IStock): string {
    if (this.isInWatchlist(stock)) return "#ff8802";   // gold
    if (this.hoveredStock?.symbol === stock.symbol) return "#be9e78ff"; // gold on hover
    else return "var(--grey-primary)";                      // grey otherwise
  }

  toggleWatchlist(stock: IStock) {
    const isInList = this.isInWatchlist(stock);
    console.log(isInList)



    if (!isInList) {
      this.http.post("http://localhost:5000/watchlist", stock).subscribe((res: any) => {
        this.watchlist.update(wl => [...wl, res]);
      });
    } else
      this.watchlist.update(wl => wl.filter(s => s.symbol !== stock.symbol)); // 🔥 trigger update
    this.http.delete(`http://localhost:5000/watchlist/${stock.symbol}`).subscribe(() => { });
  }
  

  isInWatchlist(stock: IStock): boolean {
    return this.watchlist().some(s => s.symbol === stock.symbol);
  }
  //--------------------------
}
