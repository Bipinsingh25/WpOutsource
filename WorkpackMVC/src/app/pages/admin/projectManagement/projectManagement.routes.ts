import { CanActivateViaAuthGuard } from './../../../guard/auth.guard';
import { Routes } from '@angular/router';
import { ProjectManagementComponent } from "./projectManagement.component";
import { ProjectComponent } from "app/pages/admin/projectManagement/project/project.component";

export const routes: Routes = [
    {
        path: '', component: ProjectManagementComponent, children: [
            { path: '', redirectTo: 'project', pathMatch: 'full' },
            { path: 'project', component: ProjectComponent, canActivate: [CanActivateViaAuthGuard] }
        ]
    },
]