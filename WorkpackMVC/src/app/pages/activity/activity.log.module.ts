import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './activity.log.routes';
import {HotTableModule} from 'angular-handsontable';
import {BlockUIModule} from 'ng-block-ui';
import {ActivityLogComponent} from './activity-log.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


const components = [];

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule.forChild(routes),
    HotTableModule,
    BlockUIModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components,
    ActivityLogComponent
  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class ActivityLogModule {
}
