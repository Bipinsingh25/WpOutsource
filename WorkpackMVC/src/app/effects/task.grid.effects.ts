import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {Action} from './../reducers/action.interface';
import * as fromRoot from '../reducers';
import {Observable} from "rxjs/Observable";
import * as TaskGridActions from '../actions/taskGrid.actions';
// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import {ActivityLogService} from '../services/activity-log.service';
import {TaskGridService} from '../services/task-grid.service';
import {GetTaskGridSuccessAction} from '../actions/taskGrid.actions';


@Injectable()
export class TaskGridEffects {

  constructor(private actions$: Actions,
              private taskGridService: TaskGridService,
              private store: Store<fromRoot.AppState>) {
  }

  @Effect()
  get_task_grid$: Observable<Action> = this.actions$
    .ofType(TaskGridActions.ActionTypes.GET_TASK_GRID)
    .switchMap((action: Action) => {
      return this.taskGridService.list();
    })
    .filter(data => data !== null)
    .map((data) => {
      return new TaskGridActions.GetTaskGridSuccessAction(data);
    });
}
