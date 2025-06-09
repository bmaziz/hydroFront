import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaviresRoutingModule } from './navires-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NaviresRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule
  ]
})
export class NaviresModule {}
