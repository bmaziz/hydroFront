import { Component, OnInit } from '@angular/core';
import { NavireService } from '../../../services/navire.service';
import { Router } from '@angular/router';
import { Navire } from '../../../models/navire';

@Component({
  selector: 'app-navires-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  navires: Navire[] = [];
  filtered: Navire[] = [];
  paginated: Navire[] = [];

  search = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private navireService: NavireService, private router: Router) {}

  ngOnInit(): void {
    this.loadNavires();
  }

  loadNavires(): void {
    this.navireService.getAll().subscribe(data => {
      this.navires = data;
      console.log(data);
      
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filtered = this.search
      ? this.navires.filter(n =>
          n.nomNavire?.toLowerCase().includes(this.search.toLowerCase())
        )
      : this.navires;

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginated = this.filtered.slice(start, end);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filtered.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  delete(codeNavire: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce navire ?')) {
      this.navireService.delete(codeNavire).subscribe(() => this.loadNavires());
    }
  }
}
