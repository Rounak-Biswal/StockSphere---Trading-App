import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  isLoggedIn: boolean = false;
  route = inject(Router)

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  onLogout() {
    localStorage.setItem('token', "")
    this.isLoggedIn = false
    this.route.navigateByUrl('/login')
  }
}