import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavireService } from '../../../services/navire.service';
import { PaysService } from '../../../services/pays.service';
import { Pays } from '../../../models/pays';

@Component({
  selector: 'app-navires-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  form: FormGroup;
  code: string = '';
  paysList: Pays[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private navireService: NavireService,
    private paysService: PaysService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codeNavire: [{ value: '', disabled: true }],
      nomNavire: [''],
      longueur: [''],
      puissance: [''],
      tonnage: [''],
      pay: ['']
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('codeNavire')!;

    // Charger la liste des pays d'abord
    this.paysService.getAll().subscribe(pays => {
      this.paysList = pays;

      // Puis charger les données du navire
      this.navireService.getById(this.code).subscribe(data => {
        if (data) {
          // Trouver le pays correspondant dans paysList (comparaison par codePays)
          const paysSelectionne = this.paysList.find(p => p.codePays === data.pay.codePays);

          // Patcher les données dans le formulaire, avec le pays sélectionné
          this.form.patchValue({
            codeNavire: data.codeNavire,
            nomNavire: data.nomNavire,
            longueur: data.longueur,
            puissance: data.puissance,
            tonnage: data.tonnage,
            pay: paysSelectionne || null  // sécurité si non trouvé
          });
        }
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updated = {
        codeNavire: this.code,
        nomNavire: this.form.get('nomNavire')?.value,
        longueur: this.form.get('longueur')?.value,
        puissance: this.form.get('puissance')?.value,
        tonnage: this.form.get('tonnage')?.value,
        pay: this.form.get('pay')?.value
      };

      this.navireService.update(this.code, updated).subscribe(() => {
        this.router.navigate(['/admin/navires']);
      });
    }
  }
}
