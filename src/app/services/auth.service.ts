import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { AuthUser } from '../../models/AuthUser';
import { UserAccount } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUserSubject = new BehaviorSubject<AuthUser | null>(null);
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if (token) {
      this.handleAuthentication(token, this.decodeToken(token).exp);
    }
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<{ token: string, exp: string }>(url, { username, password }).pipe(
      tap(({ token, exp }) => this.handleAuthentication(token, exp))
    );
  }

  signup(user: UserAccount): Observable<any> {
    const url = `${this.baseUrl}/users`;
    return this.http.post<{ token: string, exp: string }>(url, { user }).pipe(
      tap(({ token, exp }) => this.handleAuthentication(token, exp))
    );
  }

  private handleAuthentication(token: string, exp: string) {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      console.error('Token decoding failed.');
      return;
    }
    const user = new AuthUser(
      decodedToken.email,
      decodedToken.user_id.toString(),
      token,
      new Date(exp)
    );
    console.log('Emitting new AuthUser:', user);
    this.authUserSubject.next(user);
    this.setToken(token);
    this.setUserId(decodedToken.user_id.toString());
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.clear();
    this.tokenSubject.next(null);
    this.authUserSubject.next(null);
  }

  getUser(): Observable<AuthUser | null> {
    return this.authUserSubject.asObservable();
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }
}
