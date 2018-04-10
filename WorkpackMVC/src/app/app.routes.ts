import { CanActivateViaAuthGuard } from './guard/auth.guard';

//import { SharedModule } from './shared/index';
import { RouterModule, Routes } from '@angular/router';
import {ToDoListModule} from './pages/toDoList/to.do.list.module';


export const routes: Routes = [
    { path: '', redirectTo: 'userManagement', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
    { path: 'activityLog', loadChildren: './pages/activity/activity.log.module#ActivityLogModule' },
    { path: 'toDoList', loadChildren: './pages/toDoList/to.do.list.module#ToDoListModule' },
    { path: 'userManagement', loadChildren: './pages/admin/userManagement/userManagement.module#UserManagementModule' },
    { path: 'projectManagement', loadChildren: './pages/admin/projectManagement/projectManagement.module#ProjectManagementModule' },
    { path: 'companySettingsManagement', loadChildren: './pages/admin/companySettingsManagement/companySettingsManagement.module#CompanySettingsManagementModule' },
    { path: 'communicationSettingsManagement', loadChildren: './pages/admin/communicationSettingsManagement/communicationSettingsManagement.module#CommunicationSettingsManagementModule' },
    { path: 'miscellaneousManagement', loadChildren: './pages/admin/miscellaneousManagement/miscellaneousManagement.module#MiscellaneousManagementModule' },
    { path: 'stdRepository', loadChildren: './pages/standardRepository/stdRepo.module#stdRepoModule' },
    { path: 'auth', loadChildren: './shared/auth/auth.module#AuthModule' },
];
