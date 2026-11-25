import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/sims', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'sims',
    loadComponent: () => import('./features/sims/sims-list/sims-list.component').then(m => m.SimsListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sims/add',
    loadComponent: () => import('./features/sims/sim-form/sim-form.component').then(m => m.SimFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sims/edit/:id',
    loadComponent: () => import('./features/sims/sim-form/sim-form.component').then(m => m.SimFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sims/:id/history',
    loadComponent: () => import('./features/sims/sim-history/sim-history.component').then(m => m.SimHistoryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sims/:id/reviews',
    loadComponent: () => import('./features/reviews/sim-reviews/sim-reviews.component').then(m => m.SimReviewsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'reviews',
    loadComponent: () => import('./features/reviews/reviews-list/reviews-list.component').then(m => m.ReviewsListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'customers',
    loadComponent: () => import('./features/customers/customers-list/customers-list.component').then(m => m.CustomersListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'customers/add',
    loadComponent: () => import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'customers/edit/:id',
    loadComponent: () => import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/sims' }
];
