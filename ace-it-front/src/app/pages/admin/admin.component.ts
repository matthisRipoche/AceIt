import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ← Ajouté
import { UtilisateurService, Utilisateur } from '../../services/utilisateur/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ← Ajouté
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'] // petite typo corrigée
})
export class AdminComponent {
  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit() {
    this.utilisateurService.getUtilisateurs()
      .subscribe({
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

