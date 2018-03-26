import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from './../reducers/action.interface';
import * as ProjectTypeAction from './../actions/projectType.actions';
import { ProjectTypeService } from './../services/projectType.service';
import { ProjectType } from "app/models/projectType";

@Injectable()
export class ProjectTypeEffects {

    constructor(private actions$: Actions,
        private projectTypeService: ProjectTypeService) { }

    @Effect()
    get_all_projectTypes$: Observable<Action> = this.actions$
        .ofType(ProjectTypeAction.ActionTypes.GET_PROJECTTYPE_LIST)
        .switchMap((action: Action) => {
          debugger;
            return this.projectTypeService.list();
        })
        .map((data) => {
            return new ProjectTypeAction.GetAllProjectTypeSuccessAction(data);
        });

}
