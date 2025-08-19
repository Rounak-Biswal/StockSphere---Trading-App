import { Component, Input } from '@angular/core';
import { IStock } from '../../model/stock.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-widget',
  imports: [CommonModule],
  templateUrl: './purchase-widget.html',
  styleUrl: './purchase-widget.css'
})
export class PurchaseWidget {
  @Input() stock: IStock | null = null;

  getHigh(stock: IStock): number {
    return Math.max(...stock.history.slice(0, 7).map(h => +h.close));
  }

  getLow(stock: IStock): number {
    return Math.min(...stock.history.slice(0, 7).map(h => +h.close));
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
}
