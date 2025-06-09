import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScientifiquesRoutingModule } from './scientifiques-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScientifiquesRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule
  ]
})
export class ScientifiquesModule {}
