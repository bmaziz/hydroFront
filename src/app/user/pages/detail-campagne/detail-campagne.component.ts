import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampagneService } from '../../../services/campagne.service';

@Component({
  selector: 'app-detail-campagne',
  templateUrl: './detail-campagne.component.html',
  styleUrl: './detail-campagne.component.css'
})
export class DetailCampagneComponent implements OnInit {
  idCampagne: string = '';
  campagne:any;
  constructor(private route: ActivatedRoute,private campagneService:CampagneService) {}

  ngOnInit(): void {
    this.idCampagne = this.route.snapshot.paramMap.get('id')!;
    this.campagneService.getCampagneById(this.idCampagne).subscribe({
      next: (data) => {this.campagne = data,console.log(data);
    },
    
    error: (err) => console.error('Erreur de chargement des navires', err)
  });
  }
}