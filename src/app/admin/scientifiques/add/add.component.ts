import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScientifiqueService } from '../../../services/scientifique.service';

@Component({
  selector: 'app-scientifique-add',
  templateUrl: './add.component.html'
})
export class AddComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ScientifiqueService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom_s: ['', Validators.required],
      nom: [''],
      prenom: [''],
      sigleInst: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service.add(this.form.value).subscribe(() => {
        this.router.navigate(['/admin/scientifiques']);
      });
    }
  }
}
