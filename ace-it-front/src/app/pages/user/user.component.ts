import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    imports: [],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
