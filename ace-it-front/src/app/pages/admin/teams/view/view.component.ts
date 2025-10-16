import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService, Team } from '../../../../services/team/team.service';
import { CommonModule } from '@angular/common';
import { ProfilService } from '../../../../services/profil/profil.service';

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
    ) { }

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const id = params['id'];
        this.teamService.getTeamById(id).subscribe((team) => {
          this.team = team;
        });

        this.teamService.getProfilsByTeamId(id).subscribe((players) => {
          this.team.players = players;
        });
      });
    }

    // possible de le faire sans service
    isCoach(playerId: number): boolean {
      return this.team.coach.id === playerId;
    }
}
