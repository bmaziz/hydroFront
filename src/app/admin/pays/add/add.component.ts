import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaysService } from '../../../services/pays.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: PaysService, private router: Router) {
    this.form = this.fb.group({
      codePays: [''],
      nomPays: ['']
    });
  }

  onSubmit() {
    this.service.add(this.form.value).subscribe(() => this.router.navigate(['/admin/pays/list']));
  }
}
