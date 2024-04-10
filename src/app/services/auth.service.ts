import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AuthUser } from '../../models/AuthUser';
import { UserAccount } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUserSubject = new BehaviorSubject<AuthUser | null>(null);
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<{ token: string, exp: string }>(url, { username, password }).pipe(
      tap(({ token, exp }) => {
        const decodedToken = this.decodeToken(token);
        const user = new AuthUser(
          decodedToken.email,
          decodedToken.user_id.toString(),
          token,
          new Date(exp)
        );
        this.authUserSubject.next(user);
        this.setToken(token);
      })
    );
  }


  signup(user: UserAccount): Observable<any> {
    const url = `${this.baseUrl}/users`;
    const userData = { user: user };
    return this.http.post(url, userData);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    if (this.getToken() !== null) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUser(): Observable<AuthUser | null> {
    return this.authUserSubject.asObservable();
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
