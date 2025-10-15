import { Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

// Dashboard
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';

// Users
import { AdminUsersComponent } from './pages/admin/users/users.component';
import { AdminUserViewComponent } from './pages/admin/users/view/view.component';
import { AdminUserAddComponent } from './pages/admin/users/add/add.component';

// Profils
import { AdminProfilsComponent } from './pages/admin/profils/profils.component';

// Teams
import { AdminTeamsComponent } from './pages/admin/teams/teams.component';
import { AdminTeamViewComponent } from './pages/admin/teams/view/view.component';

// Matches
import { AdminMatchesComponent } from './pages/admin/matches/matches.component';

/**
 * Routes
 */
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
            { path: 'teams',
                children: [
                    { path: '', component: AdminTeamsComponent },
                    { path: 'view/:id', component: AdminTeamViewComponent},
                ],
            },
            { path: 'matches', component: AdminMatchesComponent },
        ], 
    },
];
