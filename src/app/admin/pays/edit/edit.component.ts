import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaysService } from '../../../services/pays.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  form: FormGroup;
  code: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: PaysService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codePays: [{ value: '', disabled: true }],
      nomPays: ['']
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('codePays')!;
    this.service.getAll().subscribe(data => {
      const found = data.find(p => p.codePays === this.code);
      if (found) this.form.patchValue(found);
    });
  }

  onSubmit() {
    const updated = {
      codePays: this.code,
      nomPays: this.form.get('nomPays')?.value
    };
    this.service.update(this.code, updated).subscribe(() => this.router.navigate(['/admin/pays/list']));
  }
}
