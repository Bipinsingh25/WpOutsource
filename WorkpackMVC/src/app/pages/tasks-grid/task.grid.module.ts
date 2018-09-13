import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './task-grid.routes';
import {HotTableModule} from 'angular-handsontable';
import {BlockUIModule} from 'ng-block-ui';
import {TasksGridComponent} from './tasks-grid.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgSelectModule} from '@ng-select/ng-select';


const components = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HotTableModule,
    BlockUIModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components,
    TasksGridComponent
  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class TaskGridModule {
}
