import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'double', loadComponent: () => import('./examples/double.component') },
  { path: 'customer', loadComponent: () => import('./examples/customer.component') },
  { path: 'customer/:id', loadComponent: () => import('./examples/customer.component') },
  { path: 'todo/:id', loadComponent: () => import('./examples/todo.component') },
  { path: 'edit/:id', loadComponent: () => import('./examples/edit-customer.component') },
  { path: 'basket', loadComponent: () => import('./examples/basket.component') },
];
