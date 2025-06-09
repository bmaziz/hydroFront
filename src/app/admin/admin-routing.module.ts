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
    { path: 'traiter-demandes', component: TraiterDemandeComponent },

    {
      path: 'pays',
      loadChildren: () => import('./pays/pays.module').then(m => m.PaysModule)
    },
    {
      path: 'laboratoires',
      loadChildren: () => import('./laboratoires/laboratoires.module').then(m => m.LaboratoiresModule)
    }
    , {
      path: 'projets',
      loadChildren: () => import('./projets/projets.module').then(m => m.ProjetsModule)
    },
    {
      path: 'scientifiques',
      loadChildren: () => import('./scientifiques/scientifiques.module').then(m => m.ScientifiquesModule)
    }
    ,{
      path: 'navires',
      loadChildren: () => import('./navires/navires.module').then(m => m.NaviresModule)
    }
    

    ,
    { path: '', redirectTo: 'upload-cli', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
