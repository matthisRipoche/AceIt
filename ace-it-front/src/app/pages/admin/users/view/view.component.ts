import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService, Utilisateur } from '../../../../services/utilisateur/utilisateur.service';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-view',
  imports: [DatePipe, NgIf, NgClass],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class AdminUserViewComponent {
  utilisateur!: Utilisateur;

  constructor(
    private utilisateurService: UtilisateurService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.utilisateurService.getUtilisateurById(id).subscribe((utilisateur) => {
        this.utilisateur = utilisateur;
        this.utilisateur.createdAt = new Date(utilisateur.createdAt);
        this.utilisateur.updatedAt = new Date(utilisateur.updatedAt);
      });
    });
  }
}
