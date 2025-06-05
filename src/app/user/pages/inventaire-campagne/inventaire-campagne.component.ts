import { Component } from '@angular/core';
import { CampagneService } from '../../../services/campagne.service';

@Component({
  selector: 'app-inventaire-campagne',
  templateUrl: './inventaire-campagne.component.html',
  styleUrls: ['./inventaire-campagne.component.css']
})
export class InventaireCampagneComponent {
  startDate: string = '';
  endDate: string = '';

  campagneIds: string[] = [];
  selectedIds: { [id: string]: boolean } = {};
  aucuneCampagne: boolean = false; // 🆕 Nouveau indicateur

  constructor(private campagneService: CampagneService) {}

  onSearch(): void {
    if (!this.startDate || !this.endDate) return;

    this.campagneIds = [];
    this.selectedIds = {};
    this.aucuneCampagne = false; // Réinitialiser

    this.campagneService.getCampagnesByDateInterval(this.startDate, this.endDate).subscribe({
      next: (ids: string[]) => {
        if (ids.length === 0) {
          this.aucuneCampagne = true; // 🆕 Aucun résultat
        } else {
          this.aucuneCampagne = false;
          this.campagneIds = ids;
          ids.forEach(id => this.selectedIds[id] = false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des campagnes:', err);
      }
    });
  }

  creerFichier(): void {
    const idsCochés = Object.keys(this.selectedIds).filter(id => this.selectedIds[id]);
    if (idsCochés.length === 0) {
      alert("Veuillez sélectionner au moins une campagne.");
      return;
    }

    this.campagneService.downloadCampagnes(idsCochés).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'campagnes_detail.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
