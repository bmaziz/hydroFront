import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VoirDonneesCampagneComponent } from './pages/voir-donnees-campagne/voir-donnees-campagne.component';
import { CompteRenduCampagneComponent } from './pages/compte-rendu-campagne/compte-rendu-campagne.component';
import { DetailCampagneComponent } from './pages/detail-campagne/detail-campagne.component';
import { InventaireCampagneComponent } from './pages/inventaire-campagne/inventaire-campagne.component';
import { ExtractionComponent } from './pages/extraction/extraction.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    { path: 'voir-donnees-campagne', component: VoirDonneesCampagneComponent },
    { path: 'compte-rendu', component: CompteRenduCampagneComponent },
    { path: 'campagnes/:id', component: DetailCampagneComponent },
    { path: 'inventaire-campagne', component: InventaireCampagneComponent },
    { path: 'extraction', component: ExtractionComponent,canActivate: [AuthGuard], },
  
    { path: '', redirectTo: 'voir-donnees-campagne', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
