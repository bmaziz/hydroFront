import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjetsRoutingModule } from './projets-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

// Import des modules Nebular nécessaires
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule
} from '@nebular/theme';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // <-- Ajouté ici
    ProjetsRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule
  ]
})
export class ProjetsModule {}
