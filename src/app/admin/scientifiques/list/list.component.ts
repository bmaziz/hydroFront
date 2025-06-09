import { Component, OnInit } from '@angular/core';
import { ScientifiqueService } from '../../../services/scientifique.service';
import { Scientifique } from '../../../models/scientifique';

@Component({
  selector: 'app-scientifique-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  scientifiques: Scientifique[] = [];
  filtered: Scientifique[] = [];
  search = '';
  currentPage = 1;
  pageSize = 10;

  constructor(private service: ScientifiqueService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => {
      this.scientifiques = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filtered = this.scientifiques.filter(s =>
      s.nom.toLowerCase().includes(this.search.toLowerCase())
    );
    this.currentPage = 1;
  }

  delete(nom_s: string): void {
    if (confirm(`Supprimer ${nom_s} ?`)) {
      this.service.delete(nom_s).subscribe(() => this.load());
    }
  }

  get paginated(): Scientifique[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filtered.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
