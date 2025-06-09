// src/app/services/laboratoire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratoire } from '../models/laboratoire';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private apiUrl = 'http://localhost:8085/api/laboratoires';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Laboratoire[]> {
    return this.http.get<Laboratoire[]>(this.apiUrl);
  }

  getById(lab: string): Observable<Laboratoire> {
    return this.http.get<Laboratoire>(`${this.apiUrl}/${lab}`);
  }

  add(laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.post<Laboratoire>(this.apiUrl, laboratoire);
  }

  update(lab: string, laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.put<Laboratoire>(`${this.apiUrl}/${lab}`, laboratoire);
  }

  delete(lab: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lab}`);
  }
}
