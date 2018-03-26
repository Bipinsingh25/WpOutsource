import { CanActivateViaAuthGuard } from './../../../guard/auth.guard';
import { Routes } from '@angular/router';

import { MiscellaneousManagement } from './miscellaneousManagement.component';
import { MaterialDataBankComponent } from './materialDatabank/materialDatabank.component';

export const routes: Routes = [
  {
    path: '', component: MiscellaneousManagement, children: [
      { path: '', redirectTo: 'materialDatabank', pathMatch: 'full' },
      { path: 'materialDatabank', component: MaterialDataBankComponent, canActivate: [CanActivateViaAuthGuard]}
    ]
  },
]
