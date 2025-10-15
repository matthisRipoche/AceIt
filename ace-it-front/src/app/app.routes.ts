import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminUsersComponent } from './pages/admin/users/users.component';
import { authGuard } from './services/auth/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminUserViewComponent } from './pages/admin/users/view/view.component';
import { AdminUserAddComponent } from './pages/admin/users/add/add.component';
import { AdminProfilsComponent } from './pages/admin/profils/profils.component';
import { AdminTeamsComponent } from './pages/admin/teams/teams.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: UserComponent, canActivate: [authGuard], data: { role: 'USER' } },
    { path: 'admin', component: AdminLayoutComponent, canActivate: [authGuard], data: { role: 'ADMIN' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'users',
                children: [
                    { path: '', component: AdminUsersComponent },
                    { path: 'view/:id', component: AdminUserViewComponent},
                    { path: 'add', component: AdminUserAddComponent},
                ],
            },
            { path: 'profils', component: AdminProfilsComponent },
            { path: 'teams', component: AdminTeamsComponent },
        ], 
    },
];
