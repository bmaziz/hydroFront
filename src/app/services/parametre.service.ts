import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {
  private apiUrl = 'http://localhost:8085/api/parametres';

  constructor(private http: HttpClient) { }
  getParamtres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
