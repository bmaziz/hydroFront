import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfilService {
  private apiUrl = 'http://localhost:8085/api/profils';

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

    return this.http.get<any[]>(this.apiUrl+"/filtrer", { params }).pipe(
      tap(profils => this.profilsSubject.next(profils))
    );
  }

  getProfils(): any[] {
    return this.profilsSubject.getValue();
  }
  exportProfilData(profilIds: string[], parametres: string[]) {
    const body = { profilIds, parametres };
    return this.http.post(this.apiUrl+"/export", body, {
      responseType: 'blob'
    });
  }
  
}
