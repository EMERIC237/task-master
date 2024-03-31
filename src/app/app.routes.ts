import { Routes } from '@angular/router';
import { HomeTaskComponent } from './home-task/home-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeTaskComponent },
    { path: 'view', component: ViewTaskComponent },
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent}
];
