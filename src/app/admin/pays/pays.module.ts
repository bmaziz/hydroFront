import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaysRoutingModule } from './pays-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbUserModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbOptionModule
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
    ReactiveFormsModule,
    PaysRoutingModule,
    // Ajout des modules Nebular nécessaires ici
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbOptionModule
  ]
})
export class PaysModule { }
