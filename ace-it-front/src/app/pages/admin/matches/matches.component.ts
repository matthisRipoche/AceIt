import { Component } from '@angular/core';
import { MatchesService, Match } from '../../../services/matches/matches.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class AdminMatchesComponent {
  matches: Match[] = [];

  constructor(
    private matchesService: MatchesService,
    public router: Router,
    
  ) {}

  ngOnInit(): void {
    this.matchesService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });
  }

  viewMatch(match: Match) {
    this.router.navigate(['/admin/matches/view', match.id]);
  }

  deleteMatch(match: Match) {
    this.matchesService.deleteMatch(match.id).subscribe(() => {
      this.matches = this.matches.filter((m) => m.id !== match.id);
    });
  }
}
