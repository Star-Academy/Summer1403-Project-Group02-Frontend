import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { GraphComponent } from './components/dashboard/graph/graph.component';
import { ImportComponent } from './components/dashboard/import/import.component';
import { ChartsComponent } from './components/dashboard/charts/charts.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'admin/register',
  //   component: RegisterComponent,
  // },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
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
