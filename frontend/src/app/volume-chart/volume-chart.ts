import { Component, Input } from '@angular/core';
import { IStock } from '../../model/stock.model';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexDataLabels,
  NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-volume-chart',
  imports: [NgApexchartsModule],
  templateUrl: './volume-chart.html',
  styleUrl: './volume-chart.css'
})
export class VolumeChart {

  @Input() stock: IStock | null = null;
  volumeSeries: ApexAxisChartSeries = [];
  xaxis: ApexXAxis = {};
  title: ApexTitleSubtitle = { text: 'Supply & Demand' };
  dataLabels: ApexDataLabels = { enabled: false };
  colors: string[] = [];

  ngOnChanges() {
    if (this.stock) {
      this.updateChartData(this.stock);
    }
  }

  updateChartData(stock: IStock) {
    const history = stock.history.slice().reverse();

    // Only keep volume data (no need for close prices here)
    this.volumeSeries = [
      {
        name: 'Volume',
        data: history.map((entry) => +entry.volume),
      },
    ];

    this.xaxis = {
      categories: history.map((entry) => entry.datetime),
      labels: {
        show: false
      }
    };

    this.colors = ['var(--electric-violet)']
  }
}
