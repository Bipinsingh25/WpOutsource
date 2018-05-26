
import { Routes } from '@angular/router';
import {WorkflowMasterComponent} from './workflow-master.component';
import {UserListComponent} from '../admin/userManagement/user/userlist.component';
import {CanActivateViaAuthGuard} from '../../guard/auth.guard';
import {ManageWorkflowsComponent} from './manage-workflows/manage-workflows.component';
import {HtmlformsComponent} from './htmlforms/htmlforms.component';
import {DocumentTemplatesComponent} from './document-templates/document-templates.component';

export const routes: Routes = [
    {
        path: '', component: WorkflowMasterComponent, children: [
            { path: '', redirectTo: 'manageWorkflows', pathMatch: 'full' },
          { path: 'manageWorkflows', component: ManageWorkflowsComponent, canActivate: [CanActivateViaAuthGuard] },
          { path: 'htmlForms', component: HtmlformsComponent, canActivate: [CanActivateViaAuthGuard] },
          { path: 'documentTemplates', component: DocumentTemplatesComponent, canActivate: [CanActivateViaAuthGuard] },
        ]
    },
];
