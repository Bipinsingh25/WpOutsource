import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './activity.log.routes';
import {HotTableModule} from 'angular-handsontable';
import {BlockUIModule} from 'ng-block-ui';
import {SafeHtmlPipe} from '../../pipes/safe-html';
import {ActivityLogComponent} from './activity-log.component';


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
    ActivityLogComponent,
    SafeHtmlPipe
  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class ActivityLogModule {
}
