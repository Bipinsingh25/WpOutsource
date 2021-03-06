
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

//

import { UserAuthEffects } from './user-auth.effect';
import { MenuEffects } from './sidebar.effects';
import { DepartmentEffects } from "app/effects/department.effects";
import { RoleEffects } from "app/effects/role.effects";
import { DesignationEffects } from "app/effects/designation.effects";
import { UserEffects } from "app/effects/user.effects";
import { ProjectTypeEffects } from './projectType.effects';
import { PriorityEffects } from "./priority.effects";
import { ClientEffects } from "./client.effects";
import { ProjectStatusEffects } from "./projectStatus.effects";
import { ProjectTemplateEffects } from "./projectTemplate.effects";
import { ExUserEffects } from './exUser.effects';
import { ProjectEffects } from './project.effects';
import {DashboardEffects} from './dashboard.effects';
import {ActivityLogEffects} from './activity.log.effects';
import {ToDoListEffects} from './toDoList.effects';
import {UserProfileEffects} from './user.profile.effects';
import {TaskGridEffects} from './task.grid.effects';



@NgModule({
  imports: [
    EffectsModule.forRoot([
      ActivityLogEffects,
      UserAuthEffects,
      MenuEffects,
      DepartmentEffects,
      DashboardEffects,
      ToDoListEffects,
      RoleEffects,
      DesignationEffects,
      UserEffects,
      ProjectTypeEffects,
      ProjectStatusEffects,
      PriorityEffects,
      ClientEffects,
      ProjectTemplateEffects,
      ExUserEffects,
      ProjectEffects,
      UserProfileEffects,
      TaskGridEffects
    ])
  ]
})
export class AppEffectsModule { }
