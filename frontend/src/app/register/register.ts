import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  http = inject(HttpClient)

  signupData: IUser = {
    username: "",
    email: "",
    password: ""
  }

  onSignup() {
    this.http.post("http://localhost:5000/register", this.signupData).subscribe(
      (res: any) => {
        console.log("New user successfully registered !!!");
      })
  }

  ngOnInit(): void {

  }
}
