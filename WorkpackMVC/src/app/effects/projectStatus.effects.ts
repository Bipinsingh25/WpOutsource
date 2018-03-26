import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from './../reducers/action.interface';
import { Observable } from 'rxjs/Observable';
import * as ProjectStatusAction from './../actions/projectStatus.actions';
import { ProjectStatusService } from './../services/projectStatus.service';
import { ProjectStatus } from './../models/projectStatus';

@Injectable()
export class ProjectStatusEffects {

    constructor(private actions$: Actions,
        private projectStatusService: ProjectStatusService) { }

    @Effect()
    get_all_projectStatus$: Observable<Action> = this.actions$
        .ofType(ProjectStatusAction.ActionTypes.GET_ALL_PROJECTSTATUS)
        .switchMap((action: Action) => {
            return this.projectStatusService.list();
        })
        .map((data) => {
            return new ProjectStatusAction.GetAllProjectStatusSuccessAction(data);
        });

}
