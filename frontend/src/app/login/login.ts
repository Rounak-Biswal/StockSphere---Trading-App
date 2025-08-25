import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILogin } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  http = inject(HttpClient)
  // Inject the AuthService
  constructor(private authService: AuthService) { }

  loginData: ILogin = {
    username: "",
    password: ""
  }

  // onLogin() {
  //   this.http.post("http://localhost:5000/login", this.loginData).subscribe((res: any) => {
  //     localStorage.setItem('token', res.token);
  //     console.log(res)
  //   })
  // }

  onLogin() {
    this.http.post("http://localhost:5000/login", this.loginData).subscribe(
      (res: any) => {
        // Call the service's login method, which handles saving the token
        this.authService.login(res.token);
        console.log("User successfully logged in.");
        // You would typically redirect to the dashboard here
      },
      (error: any) => {
        console.error("Login failed:", error.error.msg);
      }
    );
  }

  ngOnInit(): void {

  }
}
