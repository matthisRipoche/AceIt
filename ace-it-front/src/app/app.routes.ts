import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: UserComponent, canActivate: [authGuard], data: { role: 'USER' } },
    { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },

    {
        path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { role: 'ADMIN', title: 'Admin' },
        loadComponent: () => import('./template-admin/layout').then(m => m.DefaultLayoutComponent),
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadChildren: () => import('./template-admin/views/dashboard/routes').then((m) => m.routes)
          },
          {
            path: 'theme',
            loadChildren: () => import('./template-admin/views/theme/routes').then((m) => m.routes)
          },
          {
            path: 'base',
            loadChildren: () => import('./template-admin/views/base/routes').then((m) => m.routes)
          },
          {
            path: 'buttons',
            loadChildren: () => import('./template-admin/views/buttons/routes').then((m) => m.routes)
          },
          {
            path: 'forms',
            loadChildren: () => import('./template-admin/views/forms/routes').then((m) => m.routes)
          },
          {
            path: 'icons',
            loadChildren: () => import('./template-admin/views/icons/routes').then((m) => m.routes)
          },
          {
            path: 'notifications',
            loadChildren: () => import('./template-admin/views/notifications/routes').then((m) => m.routes)
          },
          {
            path: 'widgets',
            loadChildren: () => import('./template-admin/views/widgets/routes').then((m) => m.routes)
          },
          {
            path: 'charts',
            loadChildren: () => import('./template-admin/views/charts/routes').then((m) => m.routes)
          },
          {
            path: 'pages',
            loadChildren: () => import('./template-admin/views/pages/routes').then((m) => m.routes)
          }
        ]
      }
      
];
