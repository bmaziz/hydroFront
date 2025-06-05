import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { InventaireCampagneComponent } from './pages/inventaire-campagne/inventaire-campagne.component';
import { VoirDonneesCampagneComponent } from './pages/voir-donnees-campagne/voir-donnees-campagne.component';
import { CompteRenduCampagneComponent } from './pages/compte-rendu-campagne/compte-rendu-campagne.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { DetailCampagneComponent } from './pages/detail-campagne/detail-campagne.component';
import { ExtractionComponent } from './pages/extraction/extraction.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ✅ Tous les modules Nebular nécessaires
import {
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbUserModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
  NbSelectModule,
  NbOptionModule,
  NbInputModule
} from '@nebular/theme';

@NgModule({
  declarations: [
    InventaireCampagneComponent,
    VoirDonneesCampagneComponent,
    CompteRenduCampagneComponent,
    SidebarComponent,
    DetailCampagneComponent,
    ExtractionComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // ✅ Modules Nebular nécessaires pour tous les composants
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbSelectModule,
    NbOptionModule,
    NbInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Ajout pour éviter les erreurs NG8002
})
export class UserModule { }
