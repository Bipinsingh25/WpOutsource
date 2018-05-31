import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './workflow-master.routes';

import { HotTableModule } from 'angular-handsontable';


import { BlockUIModule } from 'ng-block-ui';


import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {WorkflowMasterComponent} from './workflow-master.component';
import { ManageWorkflowsComponent } from './manage-workflows/manage-workflows.component';
import { HtmlformsComponent } from './htmlforms/htmlforms.component';
import { DocumentTemplatesComponent } from './document-templates/document-templates.component';
import {NgSelectModule} from '@ng-select/ng-select';

const components = [
  WorkflowMasterComponent,
  ManageWorkflowsComponent,
  HtmlformsComponent,
  DocumentTemplatesComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HotTableModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    BlockUIModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components,
  ],
  providers: [
  ]
})
export class WorkflowMasterModule { }
