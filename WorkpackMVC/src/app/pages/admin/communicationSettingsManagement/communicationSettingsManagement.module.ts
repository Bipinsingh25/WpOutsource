import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './communicationSettingsManagement.routes';

import { HotTableModule } from 'angular-handsontable';

import { BlockUIModule } from 'ng-block-ui';
import { CommunicationSettingsManagement } from './communicationSettingsManagement.component';
import { ExternalContactsComponent } from './externalContacts/externalContacts.component';

const components = [
  CommunicationSettingsManagement,
  ExternalContactsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HotTableModule,
    BlockUIModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components,
  ]
})
export class CommunicationSettingsManagementModule { }
