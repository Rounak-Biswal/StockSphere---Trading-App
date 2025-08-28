import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  isLoggedIn: boolean = false;
  route = inject(Router)
  auth = inject(Auth)

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status
    })
  }

  onLogout() {
    // localStorage.setItem('token', "")
    // this.isLoggedIn = false
    this.auth.logout()
    this.route.navigateByUrl('/login')
  }
}