import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./sidebar/sidebar";
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { Trades } from './trades/trades';
import { Topbar } from './topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Dashboard, Profile, Trades, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
