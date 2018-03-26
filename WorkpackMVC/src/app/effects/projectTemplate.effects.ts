import { Injectable } from '@angular/core';
import { Action } from './../reducers/action.interface';
import { Actions, Effect } from '@ngrx/effects';
import { NormSet } from './../models/projectTemplate';
import { ProjectTemplateService } from './../services/projectTemplate.service';
import { Observable } from 'rxjs/Observable';
import * as projectTemplateAction from './../actions/projectTemplate.actions';

@Injectable()
export class ProjectTemplateEffects {
  constructor(private actions$: Actions,
    private projectTemplateService: ProjectTemplateService) { }

  @Effect()
  get_all_projectTemplate$: Observable<Action> = this.actions$
    .ofType(projectTemplateAction.ActionTypes.GET_PROJECT_TEMPLATE_LIST)
    .switchMap((action: Action) => {
      return this.projectTemplateService.list();
    })
    .map((data) => {
      var projectTemplate = data as NormSet[];
      return new projectTemplateAction.GetAllProjectTemplateSuccessAction(projectTemplate);
    });

}
