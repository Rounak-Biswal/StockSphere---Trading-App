import { Component, Input } from '@angular/core';
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
  selector: 'app-chart',
  imports: [NgApexchartsModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class Chart {
  @Input() stock: IStock | null = null;

  series: ApexAxisChartSeries = [];
  chartOptions: Partial<ApexChart> = {
    type: 'line',
    height: 350,
  };
  xaxis: ApexXAxis = {};
  title: ApexTitleSubtitle = {};
  tooltip: ApexTooltip = {};

  ngOnChanges() {
    if (this.stock) {
      this.updateChartData(this.stock);
    }
  }

  updateChartData(stock: IStock) {
    const history = stock.history.slice().reverse(); // oldest to newest

    this.series = [
      {
        name: stock.symbol,
        data: history.map((entry) => +entry.close),
      },
    ];

    this.xaxis = {
      categories: history.map((entry) => entry.datetime), // or time
    };

    this.title = {
      text: `${stock.symbol} Price Chart`,
      align: 'left',
    };
  }
}
