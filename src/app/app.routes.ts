import { Routes } from '@angular/router';
import { HomeTaskComponent } from './home-task/home-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AddTaskComponent } from './add-task/add-task.component';
import { CalendarTaskComponent } from './calendar-task/calendar-task.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeTaskComponent, canActivate: [authGuard] },
    { path: 'tasks', component: ViewTaskComponent, canActivate: [authGuard] },
    { path: 'add-task', component: AddTaskComponent, canActivate: [authGuard] },
    { path: 'calendar', component: CalendarTaskComponent, canActivate: [authGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
];
