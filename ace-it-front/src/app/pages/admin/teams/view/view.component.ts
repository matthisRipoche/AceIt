import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService, Team } from '../../../../services/team/team.service';
import { CommonModule } from '@angular/common';
import { ProfilService } from '../../../../services/profil/profil.service';
import { TypeStatisticService } from '../../../../services/type-statistic/type-statistic.service';

@Component({
  selector: 'app-view',
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class AdminTeamViewComponent {
    team!: Team;

    constructor(
      public router: Router,
      public route: ActivatedRoute,
      public teamService: TeamService,
      public profilService: ProfilService,
      public typeStatisticService: TypeStatisticService
    ) { }

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const id = +params['id'];
    
        this.teamService.getTeamById(id).subscribe((team) => {
          this.team = team;
    
          // Une fois le team chargé, on charge le reste
          this.teamService.getProfilsByTeamId(id).subscribe((players) => {
            this.team.players = players;
          });

          this.typeStatisticService.getTypeStatisticsByTeamId(id).subscribe({
            next: (typeStatistics) => {
              this.team.ListTypeStatistics = typeStatistics;
              console.log("Loaded type statistics:", typeStatistics);
            },
            error: (error) => {
              console.error('Error loading type statistics:', error);
            }
          });          
        });
      });
    }
    

    // possible de le faire sans service
    isCoach(playerId: number): boolean {
      return this.team.coach.id === playerId;
    }
}
