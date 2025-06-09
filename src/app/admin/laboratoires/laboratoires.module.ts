import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LaboratoiresRoutingModule } from './laboratoires-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

import {
  NbCardModule,
  NbButtonModule,
  NbInputModule
} from '@nebular/theme';

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    LaboratoiresRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule
  ]
})
export class LaboratoiresModule {}
