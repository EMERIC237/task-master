import { Routes } from '@angular/router';
import { HomeTaskComponent } from './home-task/home-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeTaskComponent },
    { path: 'view', component: ViewTaskComponent }
];
