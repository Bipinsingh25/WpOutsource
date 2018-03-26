import { ServerAuthService } from './server-auth.service';
//import { AuthService } from './authentication.service';
import { SidebarService } from './sidebar.service';
import { NgModule } from '@angular/core';
import { DepartmentService } from "./department.service";
import { RoleService } from "./role.service";
import { DesignationService } from "./designation.service";
import { UserService } from "app/services/user.service";
import { ProjectTypeService } from "./projectType.service";
import { ProjectStatusService } from "./projectStatus.service";
import { PriorityService } from "./priority.service";
import { ClientService } from "./client.service";
import { ProjectService } from "./project.service";
import { ProjectTemplateService } from "./projectTemplate.service";
import { ExUserService } from './exUser.service';


@NgModule({
    providers: [
        SidebarService,
        //AuthService,
        ServerAuthService,
        DepartmentService,
        RoleService,
        DesignationService,
        UserService,
        ProjectTypeService,
        ProjectStatusService,
        PriorityService,
        ClientService,
        ProjectService,
        ProjectTemplateService,
        ExUserService
    ]
})
export class ServiceModule { }
