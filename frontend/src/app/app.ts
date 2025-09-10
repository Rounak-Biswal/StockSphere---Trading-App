import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./sidebar/sidebar";
import { Topbar } from './topbar/topbar';
import { Notification } from './notification/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Notification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
