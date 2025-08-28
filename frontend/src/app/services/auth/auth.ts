import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private loggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable()

  private checkInitialStatus() {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true)
    }
  }

  constructor() {
    this.checkInitialStatus()
  }

  login(token: string) {
    localStorage.setItem('token', token)
    this.loggedIn.next(true)
  }

  logout() {
    localStorage.removeItem('token')
    this.loggedIn.next(false)
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token')
  }
}
