import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfilService {
  private apiUrl = 'http://localhost:8085/api/profils/filter';

  private profilsSubject = new BehaviorSubject<any[]>([]);
  profils$ = this.profilsSubject.asObservable();

  constructor(private http: HttpClient) {}

  filterProfils(filters: any): Observable<any[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      tap(profils => this.profilsSubject.next(profils))
    );
  }

  getProfils(): any[] {
    return this.profilsSubject.getValue();
  }
}
