import { Component, OnInit } from '@angular/core';
import { MesureService } from '../../../services/mesure.service';
import { ProfilService } from '../../../services/profil.service';
import { ParametreService } from '../../../services/parametre.service';
import { PermissionService } from '../../../services/permission.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styleUrls: ['./extraction.component.css']
})
export class ExtractionComponent implements OnInit {
  profils: any[] = [];
  parametres: any[] = [];
  page = 0;
  pageSize = 10;
  modeSelection: string = 'all'; 
  constructor(
    private mesureService: MesureService,
    private profilService: ProfilService,
    private parametreService: ParametreService,
    private permissionService:PermissionService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    const login = this.authService.getLoginFromToken();
    console.log(login);
    
    if (!login) {
      console.error("⚠️ Aucun login trouvé dans le token.");
      return;
    }
    
  
    this.profils = this.profilService.getProfils(); 
    this.profils.forEach(p => p.selected = false);
  
    this.permissionService.getProfilsAvecStatut(login).subscribe({
      next: statutList => {
        const statutsMap = new Map<string, string>();
  
        statutList.forEach(item => {
          statutsMap.set(item.profil.idProfil, item.statut);
        });
  
        this.profils.forEach(p => {
          p.statutDemande = statutsMap.get(p.idProfil) || 'non_demandé';
        });
      },
      error: err => console.error(err)
    });
  
    this.parametreService.getParamtres().subscribe({
      next: res => this.parametres = res.map(p => ({ ...p, selected: false })),
      error: err => console.log(err),
    });
  }

  getProfilsPage(): any[] {
    const start = this.page * this.pageSize;
    return this.profils.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.page + 1) * this.pageSize < this.profils.length) this.page++;
  }

  previousPage(): void {
    if (this.page > 0) this.page--;
  }
  demanderAcces(profilId: string): void {
    const login = this.authService.getLoginFromToken();
    if (!login) {
      console.error("⚠️ Aucun login trouvé dans le token.");
      return;
    }
  
    if (!confirm(`Voulez-vous vraiment demander l'accès au profil ${profilId} ?`)) {
      return;
    }
  
    this.permissionService.demanderAcces(profilId, login).subscribe({
      next: res => {
        alert("✅ Demande envoyée !");
        // Met à jour le statut local
        const profil = this.profils.find(p => p.idProfil === profilId);
        if (profil) profil.statutDemande = 'PENDING';
      },
      error: err => {
        alert("❌ Erreur lors de la demande : " + (err.error?.message || err.message));
      }
    });
  }
  

  onExport(): void {
    const profilIds = this.profils.filter(p => p.selected).map(p => p.idProfil);
    let parametres: string[];

    if (this.modeSelection === 'all') {
      parametres = this.parametres.map(p => p.codeParam);
    } else {
      parametres = this.parametres.filter(p => p.selected).map(p => p.codeParam);
    }

    this.mesureService.exportMesuresToTxt(profilIds, parametres).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'mesures.txt';
      link.click();
    });
  }
}
