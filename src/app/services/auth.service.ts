import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/api/auth';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }
  
  getRole(): string | null {
    return localStorage.getItem('auth-role');
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
  
  isUser(): boolean {
    return this.getRole() === 'UTILISATEUR';
  }
  
}
