import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/projet';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  projets: Projet[] = [];
  filteredProjets: Projet[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetService.getAll().subscribe(data => {
      this.projets = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredProjets = this.projets.filter(projet =>
      projet.nomProjet.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  deleteProjet(nomProjet: string): void {
    if (confirm(`Voulez-vous vraiment supprimer le projet "${nomProjet}" ?`)) {
      this.projetService.delete(nomProjet).subscribe(() => {
        this.loadProjets();
      });
    }
  }

  get paginatedProjets(): Projet[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProjets.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredProjets.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
