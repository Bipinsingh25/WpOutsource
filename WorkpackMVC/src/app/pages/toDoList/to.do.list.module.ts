import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './to-do-list.routes';
import {HotTableModule} from 'angular-handsontable';
import {BlockUIModule} from 'ng-block-ui';
import {SafeHtmlPipe} from '../../pipes/safe-html';
import {ToDoListComponent} from './to-do-list.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


const components = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HotTableModule,
    Ng2SearchPipeModule,
    BlockUIModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components,
    ToDoListComponent,
  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class ToDoListModule {
}
