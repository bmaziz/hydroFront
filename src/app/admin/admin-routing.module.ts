import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadCliComponent } from './pages/upload-cli/upload-cli.component';
import { TraiterDemandeComponent } from './pages/traiter-demande/traiter-demande.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    { path: 'upload-cli', component: UploadCliComponent },
    {path: 'traiter-demandes',component: TraiterDemandeComponent},
    { path: '', redirectTo: 'upload-cli', pathMatch: 'full' }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
