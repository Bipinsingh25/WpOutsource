import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import {Observable} from "rxjs/Observable";
import * as ToDoListActions from './../actions/toDoList.actions';
// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import {DashboardService} from '../services/dashboard.service';
import {Action} from '../reducers/action.interface';
import {ToDoListService} from '../services/to-do-list.service';

@Injectable()
export class ToDoListEffects {

  constructor(private actions$: Actions,
              private toDoListService: ToDoListService,
              private store: Store<fromRoot.AppState>) {
  }

  @Effect()
  get_dashboard$: Observable<Action> = this.actions$
    .ofType(ToDoListActions.ActionTypes.GET_TO_DO_LIST)
    .switchMap((action: Action) => {
      return this.toDoListService.getToDoList();
    })
    .filter(data => data !== null)
    .map((data) => {
      return new ToDoListActions.GetToDoListSuccessAction(data);
    });
}
