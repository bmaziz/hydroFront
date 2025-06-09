// src/app/services/navire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Navire } from '../models/navire';

@Injectable({
  providedIn: 'root'
})
export class NavireService {
  private apiUrl = 'http://localhost:8085/api/navires';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Navire[]> {
    return this.http.get<Navire[]>(this.apiUrl);
  }

  getById(codeNavire: string): Observable<Navire> {
    return this.http.get<Navire>(`${this.apiUrl}/${codeNavire}`);
  }

  add(navire: Navire): Observable<Navire> {
    return this.http.post<Navire>(this.apiUrl, navire);
  }

  update(codeNavire: string, navire: Navire): Observable<Navire> {
    return this.http.put<Navire>(`${this.apiUrl}/${codeNavire}`, navire);
  }

  delete(codeNavire: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codeNavire}`);
  }
}
