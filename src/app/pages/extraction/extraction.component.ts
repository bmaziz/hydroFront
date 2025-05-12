import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfilService } from '../../services/profil.service';
import { ParametreService } from '../../services/parametre.service';

@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styleUrls: ['./extraction.component.css']
})
export class ExtractionComponent implements OnInit {
  profils: any[] = [];
  page: number = 0;
  pageSize: number = 10;
  
  parametres:any[] = []
    ;

  constructor(private http: HttpClient, private profilService: ProfilService,private parametreService:ParametreService) {}
 
 
  
  ngOnInit(): void {
    this.profils = this.profilService.getProfils(); // récupère depuis le service partagé
    this.profils.forEach(p => p.selected = false);
    this.parametreService.getParamtres().subscribe({
      next:res=>{
        console.log(res);
        this.parametres=res
        
      },
      error(err) {
        console.log(err);
        
      },
    }) // ajoute la case à cocher
  }
  getProfilsPage(): any[] {
    const start = this.page * this.pageSize;
    return this.profils.slice(start, start + this.pageSize);
  }
  
  nextPage(): void {
    if ((this.page + 1) * this.pageSize < this.profils.length) {
      this.page++;
    }
  }
  
  previousPage(): void {
    if (this.page > 0) {
      this.page--;
    }
  }
  onExport(): void {
    const profilIds = this.profils.filter(p => p.selected).map(p => p.idProfil);
    const parametres = this.parametres.filter(p => p.selected).map(p => p.code);

    const body = { profilIds, parametres };

    this.http.post('http://localhost:8085/api/profils/export', body, {
      responseType: 'blob'
    }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'export.txt';
      link.click();
    });
  }
}
