import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MesureService {

  private apiUrl = 'http://localhost:8085/api/mesures'; // 🛠️ adapte l’URL si besoin

  constructor(private http: HttpClient) {}

  // ⬇️ Appel du backend pour exporter les mesures
  exportMesuresToTxt(idProfils: string[], codeParams: string[]) {
    const body = { idProfils, codeParams };
    return this.http.post(`${this.apiUrl}/export-txt`, body, {
      responseType: 'blob' // important pour gérer les fichiers
    });
  }//post export-txt
}
