import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 👇 Importation des composants de pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UploadCliComponent } from './pages/upload-cli/upload-cli.component';
import { InventaireCampagneComponent } from './pages/inventaire-campagne/inventaire-campagne.component';
import { VoirDonneesCampagneComponent } from './pages/voir-donnees-campagne/voir-donnees-campagne.component';
import { CompteRenduCampagneComponent } from './pages/compte-rendu-campagne/compte-rendu-campagne.component';
import { DetailCampagneComponent } from './pages/detail-campagne/detail-campagne.component';
import { ExtractionComponent } from './pages/extraction/extraction.component';

const routes: Routes = [
  { path: 'upload-cli', component: UploadCliComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inventaire-campagne', component: InventaireCampagneComponent },
  { path: 'voir-donnees-campagne', component: VoirDonneesCampagneComponent },
  { path: 'compte-rendu',component:CompteRenduCampagneComponent},
  { path: 'extraction', component: ExtractionComponent },
  { path: 'campagnes/:id', component: DetailCampagneComponent },
  { path: '', redirectTo: 'upload-cli', pathMatch: 'full' }, // par défaut → upload
  { path: '**', redirectTo: 'login' } // si URL inconnue → login
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
