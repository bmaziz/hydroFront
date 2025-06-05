import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfilService } from '../../../services/profil.service';
import * as L from 'leaflet';
import { ParametreService } from '../../../services/parametre.service';

@Component({
  selector: 'app-voir-donnees-campagne',
  templateUrl: './voir-donnees-campagne.component.html',
  styleUrls: ['./voir-donnees-campagne.component.css']
})
export class VoirDonneesCampagneComponent {
  page: number = 0;
  pageSize: number = 10;
  filtreForm!: FormGroup;
  profils: any[] = [];
  map: any;
  markerLayer: any;
  parametres: any[] = [];
  resultVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profilService: ProfilService,
    private parametreService: ParametreService
  ) {}

  ngOnInit(): void {
    this.filtreForm = this.fb.group({
      region: [''],
      latMin: [''],
      latMax: [''],
      lonMin: [''],
      lonMax: [''],
      profMin: [''],
      profMax: [''],
      dateDebut: [''],
      dateFin: ['']
    });

    this.parametreService.getParamtres().subscribe({
      next: res => this.parametres = res,
      error: err => console.log(err)
    });

    this.initMap();
    this.loadInitialProfils(); // Chargement sans afficher le tableau
  }

  loadInitialProfils(): void {
    this.profilService.filterProfils({}).subscribe(data => {
      this.profils = data;
      this.updateMarkers();
    });
  }

  onFilter(): void {
    const filters = this.filtreForm.value;
    this.profilService.filterProfils(filters).subscribe(data => {
      this.profils = data;
      this.resultVisible = true;
      this.updateMarkers();
    });
  }

  updateMarkers(): void {
    this.markerLayer.clearLayers();
    this.profils.forEach(p => {
      if (p.lat && p.longitude) {
        const circle = L.circleMarker([p.lat, p.longitude], {
          radius: 3,
          color: 'red',
          fillColor: 'red',
          fillOpacity: 0.8
        }).bindPopup(
          `<strong>ID:</strong> ${p.idProfil}<br>
           <strong>Date:</strong> ${p.dateProfil}<br>
           <strong>Profondeur:</strong> ${p.depth} m`
        );
        this.markerLayer.addLayer(circle);
      }
    });

    // Zoom auto si profils présents
    if (this.profils.length > 0) {
      const bounds = L.latLngBounds(this.profils.map(p => [p.lat, p.longitude]));
      this.map.fitBounds(bounds, { padding: [20, 20] });
    }
  }

  initMap(): void {
    this.map = L.map('map').setView([36.8, 10.2], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);
    this.markerLayer = L.layerGroup().addTo(this.map);
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

  printTable(): void {
    const printContents = document.getElementById('profilTable')?.innerHTML;
    const popupWin = window.open('', '_blank', 'width=900,height=600');
    if (popupWin && printContents) {
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Impression Tableau Profils</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body onload="window.print();window.close()">
            ${printContents}
          </body>
        </html>
      `);
      popupWin.document.close();
    }
  }
}
