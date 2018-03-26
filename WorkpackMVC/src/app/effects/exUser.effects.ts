import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from './../reducers/action.interface';
import { Observable } from 'rxjs/Observable';
import * as exUserAction from './../actions/exUser.actions';
import { ExUserService } from './../services/exUser.service';
import { ExUser } from './../models/exUser';

@Injectable()
export class ExUserEffects {
  constructor(private actions$: Actions,
    private exUserService: ExUserService) { }

  @Effect()
  get_all_exUser$: Observable<Action> = this.actions$
    .ofType(exUserAction.ActionTypes.GET_ALL_EXUSER)
    .switchMap((action: Action) => {
      return this.exUserService.list();
    })
      .map((data) => {
        debugger;
      var exUesr = data as ExUser[];
      return new exUserAction.GetAllExUserSuccessAction(exUesr);
    });


}
