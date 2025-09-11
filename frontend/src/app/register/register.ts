import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  http = inject(HttpClient)
  route = inject(Router)

  signupData: IUser = {
    username: "",
    email: "",
    password: ""
  }

  onSignup() {
    this.http.post("http://localhost:5000/register", this.signupData).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        console.log(res)
        this.route.navigateByUrl('/home')
      })
  }

  ngOnInit(): void {

  }
}
