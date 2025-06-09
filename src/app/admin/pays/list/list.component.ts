import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pays } from '../../../models/pays';
import { PaysService } from '../../../services/pays.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  paysList: Pays[] = [];
  filteredList: Pays[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  searchTerm: string = '';

  constructor(private paysService: PaysService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.paysService.getAll().subscribe(data => {
      this.paysList = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredList = this.paysList.filter(p =>
      p.nomPays.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.codePays.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  get paginatedList(): Pays[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredList.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.filteredList.length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  delete(codePays: string): void {
    const confirmed = confirm("⚠️ Voulez-vous vraiment supprimer ce pays ?");
    if (confirmed) {
      this.paysService.delete(codePays).subscribe(() => {
        this.load();
      });
    }
  }
}
