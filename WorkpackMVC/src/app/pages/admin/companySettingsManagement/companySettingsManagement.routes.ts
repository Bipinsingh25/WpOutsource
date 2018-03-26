import { CanActivateViaAuthGuard } from './../../../guard/auth.guard';
import { Routes } from '@angular/router';

import { CompanySettingsManagementComponent } from './companySettingsManagement.component';
import { TaskTypesComponent } from './taskTypes/taskTypes.component';

export const routes: Routes = [
  {
    path: '', component: CompanySettingsManagementComponent, children: [
      { path: '', redirectTo: 'taskTypes', pathMatch: 'full' },
      { path: 'taskTypes', component: TaskTypesComponent, canActivate: [CanActivateViaAuthGuard] }
    ]
  },
];
