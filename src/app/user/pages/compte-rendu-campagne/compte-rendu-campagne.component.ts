// compte-rendu-campagne.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CampagneService } from '../../../services/campagne.service';
import { NavireService } from '../../../services/navire.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LaboratoireService } from '../../../services/laboratoire.service';

@Component({
  selector: 'app-compte-rendu-campagne',
  templateUrl: './compte-rendu-campagne.component.html',
  styleUrls: ['./compte-rendu-campagne.component.css']
})
export class CompteRenduCampagneComponent implements OnInit {
  filtreForm: FormGroup;
  compagnes: any[] = [];
  selectedCompagne: any = null;
  message: string = '';

  // Données pour les filtres (à adapter selon vos besoins)
  navires: any[]=[];
  disciplines: string[] = ['Océanographie', 'Biologie', 'Géologie'];
  laboratoires: any[] = [];

  constructor(
    private navireService: NavireService,
    private laboratoireService:LaboratoireService,
    private fb: FormBuilder,
    private campagneService: CampagneService
  ) {
    // Initialisation du formulaire avec des champs vides
    this.filtreForm = this.fb.group({
      navire: [''],
      dateDebut: [''],
      dateFin: [''],
      laboratoire: ['']
    });
  }

  ngOnInit(): void {
 
    this.navireService.getAll().subscribe({
      next: (data) => {this.navires = data,console.log(data);
      },
      
      error: (err) => console.error('Erreur de chargement des navires', err)
    });
    this.laboratoireService.getAll().subscribe({
      next: (data) => {this.laboratoires = data,console.log(data);
      },
      error: (err) => console.error(err)
    });
  }

  filtrerCampagnes(): void {
    const filtres = this.filtreForm.value;



    this.campagneService.rechercherCampagnes(filtres).subscribe({
      next: (res: any[]) => {
        this.compagnes = res;
        console.log(res);
        
        this.message = '';
        this.selectedCompagne = null;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des compagnes', err);
        this.message = 'Erreur lors du chargement des campagnes.';
        this.compagnes = [];
        this.selectedCompagne = null;
      }
    });
  }
}
