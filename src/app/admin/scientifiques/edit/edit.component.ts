import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScientifiqueService } from '../../../services/scientifique.service';

@Component({
  selector: 'app-scientifique-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  form: FormGroup;
  nom_s: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ScientifiqueService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom_s: [{ value: '', disabled: true }],
      nom: [''],
      prenom: [''],
      sigleInst: ['']
    });
  }

  ngOnInit(): void {
    this.nom_s = this.route.snapshot.paramMap.get('nom_s')!;
    this.service.getById(this.nom_s).subscribe(data => {
      if (data) this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    const updated = {
      nom_s: this.nom_s,
      nom: this.form.get('nom')?.value,
      prenom: this.form.get('prenom')?.value,
      sigleInst: this.form.get('sigleInst')?.value
    };
    this.service.update(this.nom_s, updated).subscribe(() => {
      this.router.navigate(['/admin/scientifiques']);
    });
  }
}
