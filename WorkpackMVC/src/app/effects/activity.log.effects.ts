import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {Action} from './../reducers/action.interface';
import * as fromRoot from '../reducers';
import {Observable} from "rxjs/Observable";
import * as ActivityLogActions from '../actions/activityLog.actions';
// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import {ActivityLogService} from '../services/activity-log.service';


@Injectable()
export class ActivityLogEffects {

  constructor(private actions$: Actions,
              private activityLogService: ActivityLogService,
              private store: Store<fromRoot.AppState>) {
  }

  @Effect()
  get_activity_log_projects$: Observable<Action> = this.actions$
    .ofType(ActivityLogActions.ActionTypes.GET_ACTIVITY_LOG_PROJECTS)
    .switchMap((action: Action) => {
      return this.activityLogService.getProjectList();
    })
    .filter(data => data !== null)
    .map((data) => {
      return new ActivityLogActions.GetActivityLogProjectsSuccessAction(data);
    });
}
