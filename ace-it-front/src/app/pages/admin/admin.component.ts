import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurService, Utilisateur } from '../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

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
}
