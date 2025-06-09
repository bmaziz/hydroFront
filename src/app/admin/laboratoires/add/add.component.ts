import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Laboratoire } from '../../../models/laboratoire';
import { LaboratoireService } from '../../../services/laboratoire.service';

@Component({
  selector: 'app-add-laboratoire',
  templateUrl: './add.component.html'
})
export class AddComponent {
  laboratoire: Laboratoire = {
    lab: '',
    institution: '',
    ville: ''
  };

  constructor(private laboratoireService: LaboratoireService, private router: Router) {}

  add(): void {
    this.laboratoireService.add(this.laboratoire).subscribe(() => {
      this.router.navigate(['/admin/laboratoires']);
    });
  }
}
