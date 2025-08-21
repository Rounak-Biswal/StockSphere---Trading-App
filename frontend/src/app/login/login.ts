import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILogin } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  http = inject(HttpClient)

  loginData: ILogin = {
    email: "",
    password: ""
  }

  onLogin() {
    this.http.post("http://localhost:5000/login", this.loginData).subscribe((res:any) => {
      console.log("User successfully logged in")
    })
  }

  ngOnInit(): void {
    
  }
}
