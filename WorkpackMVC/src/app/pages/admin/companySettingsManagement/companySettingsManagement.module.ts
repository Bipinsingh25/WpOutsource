import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './companySettingsManagement.routes';

import { HotTableModule } from 'angular-handsontable';

import { BlockUIModule } from 'ng-block-ui';
import { CompanySettingsManagementComponent } from './companySettingsManagement.component';
import { TaskTypesComponent } from './taskTypes/taskTypes.component';

const components = [
  CompanySettingsManagementComponent,
  TaskTypesComponent
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
export class CompanySettingsManagementModule { }
