import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/projet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomProjet: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const projet: Projet = this.form.value;
      this.projetService.add(projet).subscribe(() => {
        this.router.navigate(['/admin/projets']);
      });
    }
  }
}
