import { Component, Input } from '@angular/core';
import { IStock } from '../../model/stock.model';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexStroke,
  NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-macd-chart',
  imports: [NgApexchartsModule],
  templateUrl: './macd-chart.html',
  styleUrl: './macd-chart.css'
})
export class MacdChart {

  @Input() stock: IStock | null = null;
  adSeries: ApexAxisChartSeries = [];
  xaxis: ApexXAxis = {};
  yaxis: ApexYAxis = {};
  chart: ApexChart = { type: 'line', height: 300 };
  stroke: ApexStroke = { width: 2 };
  title: ApexTitleSubtitle = { text: 'A/D' };
  colors: string[] = [];

  ngOnChanges() {
    if (this.stock) {
      this.updateChartData(this.stock);
    }
  }

  updateChartData(stock: IStock) {
    const history = stock.history.slice().reverse(); // oldest → newest
    let adValues: number[] = [];
    let cumulativeAD = 0;

    history.forEach((entry) => {
      const high = +entry.high;
      const low = +entry.low;
      const close = +entry.close;
      const volume = +entry.volume;

      let mfm = 0;
      if (high !== low) {
        mfm = ((close - low) - (high - close)) / (high - low);
      }

      const mfv = mfm * volume;
      cumulativeAD += mfv;
      adValues.push(cumulativeAD);
    });

    this.adSeries = [
      {
        name: 'A/D Line',
        data: adValues
      }
    ];

    this.xaxis = {
      categories: history.map((entry) => entry.datetime),
      labels: {
        show: false // hide to prevent crowding
      }
    };

    this.yaxis = {
      labels: {
        formatter: (val: number) => val.toFixed(0)  // ⬅️ no decimals
      }
    };
    this.colors = ['#00FA9A']
  }
}