import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scientifique } from '../models/scientifique';

@Injectable({
  providedIn: 'root'
})
export class ScientifiqueService {
  private apiUrl = 'http://localhost:8085/api/scientifiques';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Scientifique[]> {
    return this.http.get<Scientifique[]>(this.apiUrl);
  }

  getById(nom_s: string): Observable<Scientifique> {
    return this.http.get<Scientifique>(`${this.apiUrl}/${nom_s}`);
  }

  add(s: Scientifique): Observable<Scientifique> {
    return this.http.post<Scientifique>(this.apiUrl, s);
  }

  update(nom_s: string, s: Scientifique): Observable<Scientifique> {
    return this.http.put<Scientifique>(`${this.apiUrl}/${nom_s}`, s);
  }

  delete(nom_s: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nom_s}`);
  }
}
