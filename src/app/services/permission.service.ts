import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl = 'http://localhost:8085/api/permissions';

  constructor(private http: HttpClient) {}

  demanderAcces(idProfil: string, login: string): Observable<string> {
    const params = new HttpParams().set('idProfil', idProfil).set('login', login);
    return this.http.post(this.baseUrl + '/demander', null, { params, responseType: 'text' });
  }

  traiterDemande(idDemande: number, statut: string): Observable<string> {
    const params = new HttpParams().set('idDemande', idDemande).set('statut', statut);
    return this.http.post(this.baseUrl + '/traiter', null, { params, responseType: 'text' });
  }

  getProfilsAccessibles(login: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profils/${login}`);
  }

  getProfilsAvecStatut(login: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profils-etat/${login}`);
  }
  getDemandesEnAttente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/en-attente`);
  }
  
}
