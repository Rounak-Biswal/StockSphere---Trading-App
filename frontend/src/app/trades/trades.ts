import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IStock } from '../../model/stock.model'

@Component({
  selector: 'app-trades',
  imports: [HttpClientModule],
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
}
