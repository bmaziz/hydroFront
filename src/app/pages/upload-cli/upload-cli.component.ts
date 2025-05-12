import { Component } from '@angular/core';
import { CliService } from '../../services/cli.service';

@Component({
  selector: 'app-upload-cli',
  templateUrl: './upload-cli.component.html',
  styleUrls: ['./upload-cli.component.css']
})
export class UploadCliComponent {
  selectedFile!: File;
  message = '';

  constructor(private cliService: CliService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.cliService.uploadCliFile(this.selectedFile).subscribe({
        next: res => this.message = 'Fichier envoyé avec succès.',
        error: err => this.message = 'Erreur lors de l’envoi du fichier.'
      });
    }
  }
}
