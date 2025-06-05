import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-traiter-demande',
  templateUrl: './traiter-demande.component.html',
  styleUrls: ['./traiter-demande.component.css']
})
export class TraiterDemandeComponent implements OnInit {
  demandes: any[] = [];

  constructor(private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.permissionService.getDemandesEnAttente().subscribe({
      next: res => this.demandes = res,
      error: err => console.error(err)
    });
  }

  traiter(demandeId: number, statut: string): void {
    this.permissionService.traiterDemande(demandeId, statut).subscribe({
      next: () => {
        alert('✅ Demande traitée avec succès.');
        this.loadDemandes();
      },
      error: err => alert('❌ Erreur lors du traitement : ' + err.error)
    });
  }
}
