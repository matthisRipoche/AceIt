import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: UserComponent },
    { path: 'admin', component: AdminComponent }
];
