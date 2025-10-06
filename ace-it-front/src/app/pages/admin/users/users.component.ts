import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ← Import correct
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UtilisateurService, Utilisateur } from '../../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AdminUsersComponent {
  utilisateurs: Utilisateur[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    public router: Router,
    private toastr: ToastrService

  ) {}

  ngOnInit() {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => {
        console.log('Données récupérées depuis l’API :', data);
        this.utilisateurs = data;

        this.utilisateurs = data.map(u => ({
          ...u,
          createdAt: new Date(u.createdAt), // transforme la chaîne en Date JS
          updatedAt: new Date(u.updatedAt)
        }));
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    });
  }

  deleteUser(user: Utilisateur) {
    this.utilisateurService.deleteUser(user.id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== user.id);
        this.toastr.success('Utilisateur supprimé ✅');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors de la suppression ❌');
      }
    });
  }
}
