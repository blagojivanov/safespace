import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'checkin',
    loadComponent: () => import('./pages/checkin/checkin').then(m => m.CheckinComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz').then(m => m.QuizComponent)
  },
  {
    path: 'tips',
    loadComponent: () => import('./pages/tips/tips').then(m => m.TipsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent)
  },
  { path: '**', redirectTo: '/home' }
];
