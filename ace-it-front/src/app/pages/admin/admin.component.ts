import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {} from '@angular/common/http'; // ← Ajouté
import { UtilisateurService, Utilisateur } from '../../services/utilisateur/utilisateur.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    imports: [CommonModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule], // ← Ajouté
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

