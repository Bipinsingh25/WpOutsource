import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './miscellaneousManagement.routes';

import { HotTableModule } from 'angular-handsontable';

import { BlockUIModule } from 'ng-block-ui';
import { MiscellaneousManagement } from './miscellaneousManagement.component';
import { MaterialDataBankComponent } from './materialDatabank/materialDatabank.component';

const components = [
  MiscellaneousManagement,
  MaterialDataBankComponent
]
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
export class MiscellaneousManagementModule { }
