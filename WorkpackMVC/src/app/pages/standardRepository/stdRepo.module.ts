import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './stdRepo.routes';
import { stdRepoComponent } from './stdRepo.component';

import { HotTableModule } from 'angular-handsontable';


const components = [
  stdRepoComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HotTableModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components
  ],
  providers: [
  ]
})
export class stdRepoModule {}
