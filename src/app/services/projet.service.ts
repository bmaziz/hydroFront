import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private apiUrl = 'http://localhost:8085/api/projets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl);
  }

  getById(nomProjet: string): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${nomProjet}`);
  }

  add(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }

  update(nomProjet: string, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${nomProjet}`, projet);
  }

  delete(nomProjet: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nomProjet}`);
  }

  search(nom: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/search?nomProjet=${nom}`);
  }
}
