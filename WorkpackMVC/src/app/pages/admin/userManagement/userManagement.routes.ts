import { CanActivateViaAuthGuard } from './../../../guard/auth.guard';
import { Routes } from '@angular/router';

import { DepartmentComponent } from "./department/department.component";
import { DesignationComponent } from "./designation/designation.component";
import { UserManagementComponent } from "./userManagement.component";
import { RoleComponent } from "./Role/role.component";
import { UserComponent } from "./user/user.component";
import { UserRoleResolve } from "app/routeResolve/userRole.resolve";
import { UserListComponent } from "./user/userlist.component";
import { UserResolve } from "app/routeResolve/user.resolve";

export const routes: Routes = [
    {
        path: '', component: UserManagementComponent, children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            { path: 'user', component: UserListComponent, canActivate: [CanActivateViaAuthGuard] },
            { path: 'user/:id', component: UserComponent, canActivate: [CanActivateViaAuthGuard], resolve: { userRole: UserRoleResolve,user:UserResolve } },
            { path: 'department', component: DepartmentComponent, canActivate: [CanActivateViaAuthGuard] },
            { path: 'designation', component: DesignationComponent, canActivate: [CanActivateViaAuthGuard] },
            { path: 'role', component: RoleComponent, canActivate: [CanActivateViaAuthGuard] }
        ]
    },
];
