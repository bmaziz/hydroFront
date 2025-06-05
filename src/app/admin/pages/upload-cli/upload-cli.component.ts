import { Component } from '@angular/core';
import { CliService } from '../../../services/cli.service';

@Component({
  selector: 'app-upload-cli',
  templateUrl: './upload-cli.component.html',
  styleUrls: ['./upload-cli.component.css']
})
export class UploadCliComponent {
  selectedFile!: File;
  message = '';
  messageClass = '';
  isUploading = false;

  constructor(private cliService: CliService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.message = '';
    this.messageClass = '';
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.isUploading = true;
      this.message = '⏳ Envoi en cours...';
      this.messageClass = 'alert-info';

      this.cliService.uploadCliFile(this.selectedFile).subscribe({
        next: () => {
          this.isUploading = false;
          this.message = '✅ Fichier envoyé avec succès.';
          this.messageClass = 'alert-success';
        },
        error: () => {
          this.isUploading = false;
          this.message = '❌ Erreur lors de l’envoi du fichier.';
          this.messageClass = 'alert-danger';
        }
      });
    } else {
      this.message = 'Veuillez sélectionner un fichier .cli avant d’envoyer.';
      this.messageClass = 'alert-warning';
    }
  }
}
