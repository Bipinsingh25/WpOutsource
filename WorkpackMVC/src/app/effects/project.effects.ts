import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from './../reducers/action.interface';
import { Observable } from 'rxjs/Observable';
import { Project } from './../models/project';
import * as ProjectAction from './../actions/project.actions';
import { ProjectService } from './../services/project.service';

@Injectable()
export class ProjectEffects {
    constructor(private actions$: Actions,
        private projectService: ProjectService) { }

    @Effect()
    get_all_project$: Observable<Action> = this.actions$
        .ofType(ProjectAction.ActionTypes.GET_ALL_PROJECT)
        .switchMap((action: Action) => {
            return this.projectService.list();
        })
        .map((data) => {
          debugger;
            return new ProjectAction.GetAllProjectSuccessAction(data);
        });

}
