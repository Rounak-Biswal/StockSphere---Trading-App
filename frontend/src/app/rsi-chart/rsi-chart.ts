import { Component, Input } from '@angular/core';
import { IStock } from '../../model/stock.model';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexAnnotations,
  NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-rsi-chart',
  imports: [NgApexchartsModule],
  templateUrl: './rsi-chart.html',
  styleUrl: './rsi-chart.css'
})
export class RsiChart {
  @Input() stock: IStock | null = null;

  rsiSeries: ApexAxisChartSeries = [];
  xaxis: ApexXAxis = {};
  yaxis: ApexYAxis = {};
  annotations: ApexAnnotations = {};
  colors: string[] = [];

  ngOnChanges() {
    if (this.stock) {
      this.updateChartData(this.stock);
    }
  }

  updateChartData(stock: IStock) {
    const history = stock.history.slice().reverse(); // chronological order
    const closes = history.map((entry) => +entry.close);

    const rsiValues = this.calculateRSI(closes, 14);

    this.rsiSeries = [
      {
        name: 'RSI',
        data: rsiValues
      }
    ];

    this.xaxis = {
      categories: history.map((entry) => entry.datetime),
      labels: { show: false }
    };

    this.yaxis = {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (val) => val.toFixed(0)   // ✅ removes decimals
      }
    };

    this.annotations = {
      yaxis: [
        {
          y: 30,
          borderColor: '#FF0000',
          label: { text: 'Oversold', style: { color: '#fff', background: '#FF0000' } }
        },
        {
          y: 70,
          borderColor: '#00AA00',
          label: { text: 'Overbought', style: { color: '#fff', background: '#00AA00' } }
        }
      ]
    };

    this.colors = ['#FFD700']
  }

  private calculateRSI(closes: number[], period: number): number[] {
    if (closes.length < period) return [];

    let gains: number[] = [];
    let losses: number[] = [];

    // initial avg
    for (let i = 1; i <= period; i++) {
      const diff = closes[i] - closes[i - 1];
      if (diff >= 0) gains.push(diff);
      else losses.push(-diff);
    }

    let avgGain = gains.reduce((a, b) => a + b, 0) / period;
    let avgLoss = losses.reduce((a, b) => a + b, 0) / period;

    let rsiArray: number[] = [];

    for (let i = period; i < closes.length; i++) {
      const diff = closes[i] - closes[i - 1];
      let gain = diff > 0 ? diff : 0;
      let loss = diff < 0 ? -diff : 0;

      // Wilder’s smoothing method
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;

      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);
      rsiArray.push(rsi);
    }

    return rsiArray;
  }
}
