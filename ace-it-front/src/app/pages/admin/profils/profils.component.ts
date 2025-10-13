import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ← Import correct
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProfilService, Profil } from '../../../services/profil/profil.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class AdminProfilsComponent {
  utilisateurs: Profil[] = [];
  totalUtilisateurs = 0;

  constructor(
    private profilService: ProfilService,
    public router: Router,
    private toastr: ToastrService

  ) {}

  ngOnInit() {
    this.profilService.getProfils().subscribe({
      next: (data) => {
        console.log('Données récupérées depuis l’API :', data);
        this.utilisateurs = data;

        this.utilisateurs = data.map(u => ({
          ...u,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt)
        }));
        
        this.totalUtilisateurs = this.utilisateurs.length;
        
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    });
  }

  deleteUser(user: Profil) {
    this.profilService.deleteProfil(user.id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== user.id);

        //faire le calcul
        this.toastr.success('Utilisateur supprimé ✅');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors de la suppression ❌');
      }
    });
  }

  viewUser(user: Profil) {
    this.router.navigate(['/admin/users/view', user.id]);
  }
}
