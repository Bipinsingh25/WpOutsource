﻿import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import {Observable} from "rxjs/Observable";
import * as DashboardActions from './../actions/dashboard.actions';
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

@Injectable()
export class DashboardEffects {

  constructor(private actions$: Actions,
              private dashboardService: DashboardService,
              private store: Store<fromRoot.AppState>) {
  }

  @Effect()
  get_dashboard$: Observable<Action> = this.actions$
    .ofType(DashboardActions.ActionTypes.GET_DASHBOARD_PROJECTS)
    .switchMap((action: Action) => {
      return this.dashboardService.list();
    })
    .filter(data => data !== null)
    .map((data) => {
      return new DashboardActions.GetDashboardSuccessAction(data);
    });

  @Effect()
  get_dashboard_menu_list$: Observable<Action> = this.actions$
    .ofType(DashboardActions.ActionTypes.GET_MENU_LIST)
    .switchMap((action: Action) => {
      return this.dashboardService.getMenuList();
    })
    .filter(data => data !== null)
    .map((data) => {
      return new DashboardActions.GetDashboardMenuListSuccessAction(data['lstDict'][0]);
    });
}
