import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems = [
    { title: '📁 Upload CLI', link: '/admin/upload-cli' },
    { title: '📋 Inventaire', link: '/user/inventaire-campagne' },
    { title: '📝 Compte Rendu', link: '/user/compte-rendu' },
    { title: '📊 Voir Données', link: '/user/voir-donnees-campagne' },
  ];
  isLoggedIn = false;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getLoginFromToken(); // suppose que tu as une méthode comme ça
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login'; // ou via router.navigate
  }
}
