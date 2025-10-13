import { Component } from '@angular/core';
import { UtilisateurService, Utilisateur } from '../../../services/utilisateur/utilisateur.service';
import { ProfilService, Profil } from '../../../services/profil/profil.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  standalone : true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboardComponent {
  utilisateurs: Utilisateur[] = [];
  totalUtilisateurs = 0;

  profils: Profil[] = [];
  totalProfils = 0;

  moyenneTaille = 0;

  constructor(
    private utilisateurService: UtilisateurService,
    private profilService: ProfilService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => {
        console.log('Données récupérées depuis l’API :', data);
        this.utilisateurs = data;

        this.totalUtilisateurs = this.utilisateurs.length;        
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    });

    this.profilService.getProfils().subscribe({
      next: (data) => {
        console.log('Données récupérées depuis l’API :', data);
        this.profils = data;

        this.totalProfils = this.profils.length;

        // je veux calculer la taille moyenne de tout les profils
        const totalHeight = this.profils.reduce((total, profil) => total + profil.height, 0);
        this.moyenneTaille = totalHeight / this.profils.length;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des profils :', error);
      }
    });
  }
}
