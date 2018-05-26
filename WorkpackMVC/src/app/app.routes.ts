import { CanActivateViaAuthGuard } from './guard/auth.guard';

//import { SharedModule } from './shared/index';
import { RouterModule, Routes } from '@angular/router';
import {ToDoListModule} from './pages/toDoList/to.do.list.module';
import {EmailModule} from './pages/email/email.module';
import {UserProfileModule} from './pages/user-profile/user-profile.module';
import {WorkflowMasterModule} from './pages/workflow-master/workflow-master.module';


export const routes: Routes = [
    { path: '', redirectTo: 'userManagement', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
    { path: 'workflowMaster', loadChildren: './pages/workflow-master/workflow-master.module#WorkflowMasterModule' },
    { path: 'userProfile', loadChildren: './pages/user-profile/user-profile.module#UserProfileModule' },
    { path: 'activityLog', loadChildren: './pages/activity/activity.log.module#ActivityLogModule' },
    { path: 'toDoList', loadChildren: './pages/toDoList/to.do.list.module#ToDoListModule' },
    { path: 'email', loadChildren: './pages/email/email.module#EmailModule' },
    { path: 'userManagement', loadChildren: './pages/admin/userManagement/userManagement.module#UserManagementModule' },
    { path: 'projectManagement', loadChildren: './pages/admin/projectManagement/projectManagement.module#ProjectManagementModule' },
    { path: 'companySettingsManagement', loadChildren: './pages/admin/companySettingsManagement/companySettingsManagement.module#CompanySettingsManagementModule' },
    { path: 'communicationSettingsManagement', loadChildren: './pages/admin/communicationSettingsManagement/communicationSettingsManagement.module#CommunicationSettingsManagementModule' },
    { path: 'miscellaneousManagement', loadChildren: './pages/admin/miscellaneousManagement/miscellaneousManagement.module#MiscellaneousManagementModule' },
    { path: 'stdRepository', loadChildren: './pages/standardRepository/stdRepo.module#stdRepoModule' },
    { path: 'auth', loadChildren: './shared/auth/auth.module#AuthModule' },
];
