/*import { CanActivateViaAuthGuard } from './../../../guard/auth.guard';*/
import { Routes } from '@angular/router';
import {UserProfileComponent} from './user-profile.component';

/*import { DepartmentComponent } from "./department/department.component";
import { DesignationComponent } from "./designation/designation.component";
import { UserManagementComponent } from "./userManagement.component";
import { RoleComponent } from "./Role/role.component";
import { UserComponent } from "./user/user.component";
import { UserRoleResolve } from "app/routeResolve/userRole.resolve";
import { UserListComponent } from "./user/userlist.component";
import { UserResolve } from "app/routeResolve/user.resolve";*/

/*{ path: 'user', component: UserListComponent, canActivate: [CanActivateViaAuthGuard] },
            { path: 'user/:id', component: UserComponent, canActivate: [CanActivateViaAuthGuard], resolve: { userRole: UserRoleResolve,user:UserResolve } },
            { path: 'department', component: DepartmentComponent, canActivate: [CanActivateViaAuthGuard] },
            { path: 'designation', component: DesignationComponent, canActivate: [CanActivateViaAuthGuard] },
            { path: 'role', component: RoleComponent, canActivate: [CanActivateViaAuthGuard] }*/
export const routes: Routes = [
    {
        path: '', component: UserProfileComponent, children: [
            { path: '', redirectTo: 'userProfile', pathMatch: 'full' }
        ]
    },
];
