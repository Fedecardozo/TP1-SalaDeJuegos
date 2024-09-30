import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'juegos',
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    children: [
      { path: '', redirectTo: 'ahorcado', pathMatch: 'full' },
      {
        path: 'ahorcado',
        loadComponent: () =>
          import('./pages/juegos/ahorcado/ahorcado.component').then(
            (m) => m.AhorcadoComponent
          ),
      },
      {
        path: 'cartas',
        loadComponent: () =>
          import('./pages/juegos/cartas/cartas.component').then(
            (m) => m.CartasComponent
          ),
      },
      {
        path: 'preguntados',
        loadComponent: () =>
          import('./pages/juegos/preguntados/preguntados.component').then(
            (m) => m.PreguntadosComponent
          ),
      },
    ],
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat.component').then((m) => m.ChatComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
