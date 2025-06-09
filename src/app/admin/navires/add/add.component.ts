import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavireService } from '../../../services/navire.service';
import { PaysService } from '../../../services/pays.service';
import { Pays } from '../../../models/pays';

@Component({
  selector: 'app-navires-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  form: FormGroup;
  paysList: Pays[] = [];

  constructor(
    private fb: FormBuilder,
    private navireService: NavireService,
    private paysService: PaysService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codeNavire: ['', Validators.required],
      nomNavire: [''],
      longueur: [''],
      puissance: [''],
      tonnage: [''],
      pay: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.paysService.getAll().subscribe(data => this.paysList = data);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.navireService.add(this.form.value).subscribe(() => {
        this.router.navigate(['/admin/navires']);
      });
    }
  }
}
