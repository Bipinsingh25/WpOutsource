import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './userManagement.routes';

import { HotTableModule } from 'angular-handsontable';


import { BlockUIModule } from 'ng-block-ui';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { UserManagementComponent } from "./userManagement.component";
import { RoleComponent } from "./Role/role.component";
import { UserComponent } from "./user/user.component";
import { UserRoleResolve } from "app/routeResolve/userRole.resolve";
import { UserListComponent } from "./user/userlist.component";
import { UserResolve } from "app/routeResolve/user.resolve";
import { FilterNullPipe } from "app/pipes/filterNull.pipe";


const components = [
  UserManagementComponent,
  UserComponent,
  UserListComponent,
  DepartmentComponent,
  DesignationComponent,
  RoleComponent
]

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
    FilterNullPipe
  ],
  exports: [
    ...components,
  ],
  providers: [
    UserRoleResolve,
    UserResolve
  ]
})
export class UserManagementModule { }
