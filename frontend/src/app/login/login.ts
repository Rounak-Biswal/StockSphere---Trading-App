import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILogin } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  http = inject(HttpClient)
  route = inject(Router)
  auth = inject(Auth)

  loginData: ILogin = {
    username: "",
    password: ""
  }

  onLogin() {
    this.http.post("http://localhost:5000/login", this.loginData).subscribe((res: any) => {
      // localStorage.setItem('token', res.token);
      this.auth.login(res.token)
      console.log(res)
      this.route.navigateByUrl('/home')
    })
  }

  ngOnInit(): void {

  }
}
