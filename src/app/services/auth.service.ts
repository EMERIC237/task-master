import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Adjust this URL to match your Rails backend

  constructor(private http: HttpClient) {} // Inject HttpClient

  // Method to log in a user
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`; // Adjust login endpoint as needed
    return this.http.post(url, { email, password }); // Send a POST request with the email and password
  }

  // Method to sign up/register a new user
  signup(email: string, password: string, passwordConfirmation: string): Observable<any> {
    const url = `${this.baseUrl}/signup`; // Adjust signup endpoint as needed
    return this.http.post(url, { email, password, password_confirmation: passwordConfirmation });
  }
}
