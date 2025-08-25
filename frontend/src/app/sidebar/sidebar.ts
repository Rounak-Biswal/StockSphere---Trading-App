import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  isLoggedIn: boolean = false;

  checkLoginStatus() {
    this.isLoggedIn = (localStorage && localStorage.getItem('token')) ? true : false;
  }

  onLogout(){
    this.isLoggedIn = false;
    localStorage.setItem('token', "")
  }

  ngOnInit(): void {
    this.checkLoginStatus()
  }
}
