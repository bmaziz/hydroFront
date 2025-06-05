import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadCliComponent } from './pages/upload-cli/upload-cli.component';
import { AdminSidebarComponent } from './pages/admin-sidebar/admin-sidebar.component';
import { TraiterDemandeComponent } from './pages/traiter-demande/traiter-demande.component';

// ✅ Imports des modules Nebular nécessaires pour navbar, sidebar et UI
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
    UploadCliComponent,
    DashboardComponent,
    AdminSidebarComponent,
    TraiterDemandeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,

    // ✅ Nebular modules
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
export class AdminModule { }
