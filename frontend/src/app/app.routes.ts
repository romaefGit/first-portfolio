import { Routes } from '@angular/router';
import { LandingLayout } from './landing/landing-layout';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    component: LandingLayout,
    children: [
      { path: 'inicio', loadComponent: () => import('./landing/pages/inicio/inicio').then((m) => m.Inicio) },
      { path: 'informacion', loadComponent: () => import('./landing/pages/hojadevida/hojadevida').then((m) => m.HojaDeVida) },
      { path: 'fullstack', loadComponent: () => import('./landing/pages/fullstack/fullstack').then((m) => m.Fullstack) },
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    ],
  },
  { path: '**', redirectTo: 'inicio' },
];
