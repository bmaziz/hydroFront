import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Navire {
  codeNavire: string;
  nom: string;
  // ajoute d'autres champs si nécessaires
}
@Injectable({
  providedIn: 'root'
})
export class NavireService {
  private apiUrl = 'http://localhost:8085/api/navires';

  constructor(private http: HttpClient) {}

  getNavires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
