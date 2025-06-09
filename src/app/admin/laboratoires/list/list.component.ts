import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../../../services/laboratoire.service';
import { Laboratoire } from '../../../models/laboratoire';

@Component({
  selector: 'app-laboratoire-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  laboratoireList: Laboratoire[] = [];
  filteredList: Laboratoire[] = [];
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';

  constructor(private laboratoireService: LaboratoireService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.laboratoireService.getAll().subscribe(data => {
      this.laboratoireList = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredList = this.laboratoireList.filter(l =>
      l.lab.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      l.ville.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  get paginatedList(): Laboratoire[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredList.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.filteredList.length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  delete(lab: string): void {
    const confirmed = confirm("⚠️ Voulez-vous vraiment supprimer ce laboratoire ?");
    if (confirmed) {
      this.laboratoireService.delete(lab).subscribe(() => this.load());
    }
  }
}
