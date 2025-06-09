import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoireService } from '../../../services/laboratoire.service';
import { Laboratoire } from '../../../models/laboratoire';

@Component({
  selector: 'app-edit-laboratoire',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  laboratoire: Laboratoire = {
    lab: '',
    institution: '',
    ville: ''
  };

  constructor(
    private route: ActivatedRoute,
    private laboratoireService: LaboratoireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('lab');
    if (code) {
      this.laboratoireService.getById(code).subscribe(data => this.laboratoire = data);
    }
  }

  update(): void {
    this.laboratoireService.update(this.laboratoire.lab, this.laboratoire).subscribe(() => {
      this.router.navigate(['/admin/laboratoires']);
    });
  }
}
