import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ← Import correct
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TeamService, Team } from '../../../services/team/team.service';

@Component({
  selector: 'app-admin-teams',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class AdminTeamsComponent {
  teams: Team[] = [];
  totalTeams = 0;

  constructor(
    private teamService: TeamService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  /**
   * A l'initialisation de la page on va chercher les profils
   */
  ngOnInit() {
    this.teamService.getTeams().subscribe({
      next: (data) => {
        console.log('Données récupérées depuis l’API :', data);
        this.teams = data;

        this.teams = data.map(u => ({
          ...u,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt)
        }));
        
        this.totalTeams = this.teams.length;
        
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    });
  }

  /**
   * Supprimer un profil
   * @param team 
   */
  deleteUser(team: Team) {
    this.teamService.deleteTeam(team.id).subscribe({
      next: () => {
        this.teams = this.teams.filter(u => u.id !== team.id);
        this.toastr.success('Profil supprimé ✅');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors de la suppression ❌');
      }
    });
  }

  /**
   * Voir un profil
   * @param team 
   */
  viewProfil(team: Team) {
    this.router.navigate(['/admin/teams/view', team.id]);
  }
}
