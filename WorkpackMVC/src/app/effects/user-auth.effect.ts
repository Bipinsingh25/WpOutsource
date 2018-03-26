import { AppState } from './../reducers/index';
import { ServerAuthService } from './../services/server-auth.service';
import * as UserAuthActions from './../actions/user-auth.action';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Action } from './../reducers/action.interface';
import * as fromRoot from '../reducers';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

@Injectable()
export class UserAuthEffects {

  constructor(private actions$: Actions,
    private serverAuthService: ServerAuthService,
    private store: Store<fromRoot.AppState>) { }

  // tslint:disable-next-line:member-ordering
  @Effect()
  server_login$: Observable<Action> = this.actions$
    .ofType(UserAuthActions.ActionTypes.SERVER_LOGIN)
    .switchMap((action: Action) => {
      return this.serverAuthService.login(action.payload.data);
    })
    .filter(data => data !== null)
    .map((data) => {
      if (typeof (data) === typeof ('string')) {
        // return new UpdateLoginFormNotification('Invalid data');
      } else {
        //const user = this.serverAuthService.getServerUserProfile(data);
        return new UserAuthActions.ServerLoginSuccessAction(data);
      }
    });

  // tslint:disable-next-line:member-ordering
  @Effect()
  server_logout$: Observable<Action> = this.actions$
    .ofType(UserAuthActions.ActionTypes.SERVER_LOGOUT)
    .switchMap(() => this.serverAuthService.signOut())
    .map(() => new UserAuthActions.ServerLogoutSuccessAction());

  // tslint:disable-next-line:member-ordering
  @Effect()
  get_header_notification$: Observable<Action> = this.actions$
    .ofType(UserAuthActions.ActionTypes.GET_HEADER_NOTIFICATION)
    .switchMap((action: Action) => {
      return this.serverAuthService.getHeaderNotification(action.payload);
    })
    .filter(data => data !== null)
    .map((data) => {
      return new UserAuthActions.GetHeaderNotificationSuccessAction(data);
    });

}
