import { Component } from '@angular/core';
import { CampagneService } from '../../services/campagne.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';
import * as L from 'leaflet';
import { ParametreService } from '../../services/parametre.service';

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
  parametres:any[]=[]

  constructor(private fb: FormBuilder, private profilService: ProfilService,private parametreService:ParametreService) {}

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
      next:res=>{
        console.log(res);
        this.parametres=res
        
      },
      error(err) {
        console.log(err);
        
      },
    })
    this.onFilter()
    const iconUrl = 'assets/leaflet/marker-icon.png';
    const shadowUrl = 'assets/leaflet/marker-shadow.png';

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: iconUrl,
      iconRetinaUrl: iconUrl,
      shadowUrl: shadowUrl
    });
    this.initMap();
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
  initMap(): void {
    this.map = L.map('map').setView([36.8, 10.2], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.markerLayer = L.layerGroup().addTo(this.map);
  }

  onFilter(): void {
    const filters = this.filtreForm.value;
    this.profilService.filterProfils(filters).subscribe(data => {
      console.log(data);
      
      this.profils = data;
      this.updateMarkers();
    });
  }

  updateMarkers(): void {
    this.markerLayer.clearLayers();
    this.profils.forEach(p => {
      if (p.lat && p.longitude) {
        const marker = L.marker([p.lat, p.longitude]).bindPopup(
          `<strong>ID:</strong> ${p.idProfil}<br>
           <strong>Date:</strong> ${p.dateProfil}<br>
           <strong>Profondeur:</strong> ${p.depth} m`
        );
        this.markerLayer.addLayer(marker);
      }
    });
  }
}

