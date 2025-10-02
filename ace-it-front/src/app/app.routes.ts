import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: UserComponent, canActivate: [authGuard], data: { role: 'USER' } },
    { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
];
