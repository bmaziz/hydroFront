import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  private baseUrl = 'http://localhost:8085/api/compagnes';

  constructor(private http: HttpClient) {}

  // 🔍 Récupérer les campagnes par intervalle de dates
  getCampagnesByDateInterval(start: string, end: string): Observable<any[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<any[]>(this.baseUrl+"/searchByDate", { params });
  }
  downloadCampagnes(ids: string[]): Observable<Blob> {
    return this.http.post(this.baseUrl+'/download', ids, {
      responseType: 'blob' // on reçoit un fichier
    });
  }
  
  rechercherCampagnes(data?:any): Observable<any[]> {
    let url=this.baseUrl+"/search?";
    console.log(data.navire);
    
   
    if(data.navire && data.navire!="")
      url+="navire="+data.navire+"&"
    if(data.dateDebut && data.dateDebut!="")
      url+="dateDebut="+data.dateDebut+"&"
    if(data.dateFin && data.dateFin!="")
      url+="dateFin="+data.dateFin+"&"
    if(data.laboratoire && data.laboratoire!="")
      url+="laboratoire="+data.laboratoire

console.log(url);

    return this.http.get<any[]>(url);
  }
  // 📥 Créer et télécharger le fichier d'inventaire
  creerFichierInventaire(ids: string[]): Observable<Blob> {
    return this.http.post(this.baseUrl + '/inventaire', ids, { responseType: 'blob' });
  }
  getAllCampagnes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getCampagneById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  getDonneesByCampagneId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/donnees`);
  }
 
}
