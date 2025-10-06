import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminUsersComponent } from './pages/admin/users/users.component';
import { authGuard } from './services/auth/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: UserComponent, canActivate: [authGuard], data: { role: 'USER' } },
    { path: 'admin', component: AdminLayoutComponent, canActivate: [authGuard], data: { role: 'ADMIN' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'users', component: AdminUsersComponent },
        ], 
    },
];
