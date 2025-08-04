import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IStock } from '../../model/stock.model';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  http = inject(HttpClient)

  watchlistData: IStock[] = []

  getWatchlistData() {
    this.http.get("http://localhost:5000/watchlist/all")
      .subscribe((res: any) => {
        this.watchlistData = res;
        console.log(this.watchlistData)
      })
  }

  ngOnInit(): void {
    this.getWatchlistData()
  }
}
