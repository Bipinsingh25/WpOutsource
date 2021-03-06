import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './email.routes';
import {HotTableModule} from 'angular-handsontable';
import {BlockUIModule} from 'ng-block-ui';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import {EmailComponent} from './email.component';
import {WysiHtmlModule} from 'angular2-voog-wysihtml';
import {CKEditorModule} from 'ng2-ckeditor';
import {SafeHtmlPipe} from '../../pipes/safe-html';


const components = [];

@NgModule({
  imports: [
    CommonModule,
    WysiHtmlModule,
    CKEditorModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    FormsModule,
    RouterModule.forChild(routes),
    HotTableModule,
    BlockUIModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components,
    EmailComponent,
    SafeHtmlPipe
  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class EmailModule {
}
