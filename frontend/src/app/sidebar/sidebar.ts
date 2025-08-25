import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to the status. This will automatically update isLoggedIn.
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  onLogout() {
    // Call the service's logout method
    this.authService.logout();
  }
}
