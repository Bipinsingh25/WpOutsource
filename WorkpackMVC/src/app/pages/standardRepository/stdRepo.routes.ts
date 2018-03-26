import { Routes } from '@angular/router';
import { stdRepoComponent } from './stdRepo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'stdRepo', pathMatch: 'full' },
  { path: 'stdRepo', component: stdRepoComponent }
];
