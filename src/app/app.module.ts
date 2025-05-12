import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UploadCliComponent } from './pages/upload-cli/upload-cli.component';
import { CompteRenduCampagneComponent } from './pages/compte-rendu-campagne/compte-rendu-campagne.component';
import { VoirDonneesCampagneComponent } from './pages/voir-donnees-campagne/voir-donnees-campagne.component';
import { InventaireCampagneComponent } from './pages/inventaire-campagne/inventaire-campagne.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbIconModule,
  NbButtonModule,
} from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailCampagneComponent } from './pages/detail-campagne/detail-campagne.component';
import { ExtractionComponent } from './pages/extraction/extraction.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UploadCliComponent,
    InventaireCampagneComponent,
    VoirDonneesCampagneComponent,
    CompteRenduCampagneComponent,
    SidebarComponent,
    DetailCampagneComponent,
    ExtractionComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Nebular modules
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbIconModule,
    NbButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
