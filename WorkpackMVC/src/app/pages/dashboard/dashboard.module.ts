import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './dashboard.routes';
import {HotTableModule} from 'angular-handsontable';
import {BlockUIModule} from 'ng-block-ui';
import {DashboardComponent} from './dashboard.component';


const components = [];

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
    ...components,
    DashboardComponent
  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class DashboardModule {
}
