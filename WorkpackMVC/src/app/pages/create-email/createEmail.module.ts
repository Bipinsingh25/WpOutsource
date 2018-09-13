import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './createEmail.routes';
import {HotTableModule} from 'angular-handsontable';
import {BlockUIModule} from 'ng-block-ui';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import {CreateEmailComponent} from './create-email.component';
import {WysiHtmlModule} from 'angular2-voog-wysihtml';
import {CKEditorModule} from 'ng2-ckeditor';


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
    CreateEmailComponent,

  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class CreateEmailModule {
}
