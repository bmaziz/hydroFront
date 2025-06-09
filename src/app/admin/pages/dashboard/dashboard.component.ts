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
  isLoggedIn = false;
  username: string | null = null;
  adminMenuItems = [
    {
      title: '📁 Upload CLI',
      icon: 'upload-outline',
      link: '/admin/upload-cli',
    },
    {
      title: '📥 Traiter Demandes',
      icon: 'checkmark-circle-2-outline',
      link: '/admin/traiter-demandes',
    },
    {
      title: '🌍 Gestion des Pays',
      icon: 'globe-2-outline',
      link: '/admin/pays/list',
    },
    {
      title: '🏢 Gestion des Laboratoires',
      icon: 'home-outline',
      link: '/admin/laboratoires',
    },
    {
      title: '📁 Gestion des Projets',
      icon: 'folder-outline',
      link: '/admin/projets'
    },
    {
      title: '🧑‍🔬 Gestion des Scientifiques',
      icon: 'people-outline',
      link: '/admin/scientifiques'
    },
    {
      title: '🚢 Gestion des Navires',
      icon: 'compass-outline',
      link: '/admin/navires'
    }
    
    
    
    
  ];
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
