import { Component } from '@angular/core';
import { UtilisateurService, Utilisateur } from '../../../services/utilisateur/utilisateur.service';
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

        this.totalUtilisateurs = this.utilisateurs.length;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    });
  }
}
