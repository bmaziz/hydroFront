import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 350;
  }
  menuItems = [
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
    window.location.href = '/'; // ou via router.navigate
  }
}
