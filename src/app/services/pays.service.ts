import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pays } from '../models/pays';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private apiUrl = 'http://localhost:8085/api/pays';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.apiUrl);
  }

  getByCode(code: string): Observable<Pays> {
    return this.http.get<Pays>(`${this.apiUrl}/${code}`);
  }

  add(pays: Pays): Observable<Pays> {
    return this.http.post<Pays>(this.apiUrl, pays);
  }

  update(code: string, pays: Pays): Observable<Pays> {
    return this.http.put<Pays>(`${this.apiUrl}/${code}`, pays);
  }

  delete(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${code}`);
  }
}
