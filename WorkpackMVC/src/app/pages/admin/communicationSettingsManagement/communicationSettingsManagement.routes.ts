import { CanActivateViaAuthGuard } from './../../../guard/auth.guard';
import { Routes } from '@angular/router';

import { CommunicationSettingsManagement } from './communicationSettingsManagement.component';
import { ExternalContactsComponent } from './externalContacts/externalContacts.component';

export const routes: Routes = [
  {
    path: '', component: CommunicationSettingsManagement, children: [
      { path: '', redirectTo: 'externalContacts', pathMatch: 'full' },
      { path: 'externalContacts', component: ExternalContactsComponent, canActivate: [CanActivateViaAuthGuard] }
    ]
  },
];
