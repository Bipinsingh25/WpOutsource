import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './projectManagement.routes';

import { ProjectManagementComponent } from "./projectManagement.component";
import { ProjectComponent } from "app/pages/admin/projectManagement/project/project.component";
import { BlockUIModule } from "ng-block-ui/dist";

const components = [
    ProjectManagementComponent,
    ProjectComponent,
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        BlockUIModule
    ],
    declarations: [
      ...components
    ],
    exports: [
        ...components,
    ],
    providers: [
    ]
})
export class ProjectManagementModule { }
