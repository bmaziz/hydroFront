import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private apiUrl = 'http://localhost:8085/api/laboratoires';

  constructor(private http: HttpClient) {}

  getLaboratoires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
