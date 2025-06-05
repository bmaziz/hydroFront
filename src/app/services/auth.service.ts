import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // ✅ correct

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { login: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('auth-token', token);
  }
  getLoginFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || decoded.login || null; // selon le champ utilisé dans ton JWT
    } catch (e) {
      console.error("Erreur de décodage du token :", e);
      return null;
    }
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
