import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/projet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nom = this.route.snapshot.paramMap.get('nomProjet');

    this.form = this.fb.group({
      nomProjet: [{ value: '', disabled: true }, Validators.required], // Lecture seule
    });

    if (nom) {
      this.projetService.getById(nom).subscribe(data => {
        this.form.patchValue({
          nomProjet: data.nomProjet,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Récupérer la valeur même des champs désactivés
      const projet: Projet = {
        nomProjet: this.form.getRawValue().nomProjet
      };

      // Ici, ajoute d'autres propriétés du projet si nécessaire avant update

      this.projetService.update(projet.nomProjet, projet).subscribe(() => {
        this.router.navigate(['/admin/projets']);
      });
    }
  }
}
