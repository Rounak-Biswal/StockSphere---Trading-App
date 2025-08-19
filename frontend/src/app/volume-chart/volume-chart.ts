import { Component } from '@angular/core';
import { IStock } from '../../model/stock.model';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-volume-chart',
  imports: [],
  templateUrl: './volume-chart.html',
  styleUrl: './volume-chart.css'
})
export class VolumeChart {
  volumeSeries: ApexAxisChartSeries = [];
  xaxis: ApexXAxis = {};
  title: ApexTitleSubtitle = {};

  updateChartData(stock: IStock) {
    const history = stock.history.slice().reverse();

    // Price series (candlestick or line)
    this.volumeSeries = [
      {
        name: stock.symbol,
        data: history.map((entry) => +entry.close),
      },
    ];

    // Volume series (separate)
    this.volumeSeries = [
      {
        name: 'Volume',
        type: 'bar',
        data: history.map((entry) => +entry.volume),
      },
    ];

    this.xaxis = {
      categories: history.map((entry) => entry.datetime),
    };

    this.title = {
      text: `${stock.symbol} Price & Volume`,
      align: 'left',
    };
  }

}
