import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth/auth.guard';
import { AdminLayout } from './layout/admin-layout';
import { AdminRoot } from './layout/admin-root';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminRoot,
    children: [
      {
        path: 'login',
        canActivate: [guestGuard],
        title: 'ROMAEF | Admin',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: '',
        component: AdminLayout,
        canActivate: [authGuard],
        children: [
          {
            path: 'inicio',
            data: { seccion: 'Inicio' },
            loadComponent: () => import('./pages/inicio/inicio').then((m) => m.AdminInicio),
          },
          {
            path: 'perfil',
            data: { seccion: 'Perfil' },
            loadComponent: () => import('./pages/perfil/perfil').then((m) => m.Perfil),
          },
          {
            path: 'languages',
            data: { seccion: 'Lenguajes' },
            loadComponent: () => import('./pages/languages/languages').then((m) => m.Languages),
          },
          {
            path: 'empresas',
            data: { seccion: 'Empresas' },
            loadComponent: () => import('./pages/empresas/empresas').then((m) => m.Empresas),
          },
          {
            path: 'articulos',
            data: { seccion: 'Artículos' },
            loadComponent: () => import('./pages/articulos/articulos').then((m) => m.Articulos),
          },
          { path: '', pathMatch: 'full', redirectTo: 'inicio' },
        ],
      },
    ],
  },
];
