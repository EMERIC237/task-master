import { Routes } from '@angular/router';
import { HomeTaskComponent } from './home-task/home-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeTaskComponent, canActivate: [authGuard] },
    { path: 'view', component: ViewTaskComponent, canActivate: [authGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
];
