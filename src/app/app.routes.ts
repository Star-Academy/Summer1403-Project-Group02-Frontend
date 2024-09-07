import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { GraphComponent } from './components/dashboard/graph/graph.component';
import { ImportComponent } from './components/dashboard/import/import.component';
import { ChartsComponent } from './components/dashboard/charts/charts.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [authGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard/users',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent,
        title: 'User control',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
      },
      {
        path: 'graph',
        component: GraphComponent,
      },
      {
        path: 'import',
        component: ImportComponent,
      },
      {
        path: 'charts',
        component: ChartsComponent,
      },
    ],
  },
];
