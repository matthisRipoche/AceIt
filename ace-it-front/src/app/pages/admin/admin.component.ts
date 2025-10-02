import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ← Import correct
import { Router } from '@angular/router';

import { UtilisateurService, Utilisateur } from '../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  utilisateurs: Utilisateur[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit() {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => {
        console.log('Données récupérées depuis l’API :', data);
        this.utilisateurs = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
