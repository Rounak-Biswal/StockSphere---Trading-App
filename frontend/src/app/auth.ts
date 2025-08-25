import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A private BehaviorSubject to manage the login state
  private loggedIn = new BehaviorSubject<boolean>(false);

  // Expose the state as a public observable to other components
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor() {
    // Check for a token when the service is first created
    this.checkTokenStatus();
  }

  // Initial check: if a token exists, the user is logged in
  private checkTokenStatus() {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true);
    }
  }

  // Method to call on successful login
  login(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true); // Update the state to true
  }

  // Method to call on logout
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Update the state to false
  }

  // A getter for the token, used by other services (e.g., an interceptor)
  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
}