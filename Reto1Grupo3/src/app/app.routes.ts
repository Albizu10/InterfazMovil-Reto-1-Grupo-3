import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactosComponent } from './contactos/contactos.component';

export const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full',},
  { path: 'home',loadComponent: () => import('./home/home.page').then((m) => m.HomePage),},
  { path: 'login',loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),},
  { path: 'contactos',loadComponent: () => import('./contactos/contactos.component').then((m) => m.ContactosComponent),},

];
