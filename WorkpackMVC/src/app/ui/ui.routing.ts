import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
    { path: '', redirectTo: 'layout', pathMatch: 'full' },
    { path: 'layout', component: LayoutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

