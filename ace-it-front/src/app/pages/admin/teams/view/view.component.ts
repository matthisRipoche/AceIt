import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService, Team } from '../../../../services/team/team.service';
import { CommonModule } from '@angular/common';

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
    ) { }

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const id = params['id'];
        this.teamService.getTeamById(id).subscribe((team) => {
          this.team = team;
        });
      });

      this.teamService.getProfilsByTeamId(this.team.id).subscribe((players) => {
        this.team.players = players;
      });
    }
}
