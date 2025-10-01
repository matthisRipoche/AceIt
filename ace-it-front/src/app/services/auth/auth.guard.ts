import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(decodedToken.exp * 1000);

    if (expirationDate < new Date()) {
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }

    // Si la route attend un rôle particulier
    const expectedRole = route.data?.['role'];
    if (expectedRole && decodedToken.role !== expectedRole) {
      // Redirection selon le rôle réel de l’utilisateur
      if (decodedToken.role === 'ADMIN') {
        router.navigate(['/admin']);
      } else {
        router.navigate(['/']);
      }
      return false;
    }

    return true;
    
  } catch (err) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};
