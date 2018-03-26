import { Injectable } from "@angular/core";
import { AppState } from './../reducers/index';
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Action } from './../reducers/action.interface';
import * as fromRoot from '../reducers';
import { RoleService } from "app/services/role.service";
import { Observable } from "rxjs/Observable";
import * as RoleActions from './../actions/role.actions';



// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

@Injectable()
export class RoleEffects {

    constructor(private actions$: Actions,
        private roleService: RoleService,
        private store: Store<fromRoot.AppState>) { }

    @Effect()
    get_role$: Observable<Action> = this.actions$
        .ofType(RoleActions.ActionTypes.GET_ROLE_LIST)
        .switchMap((action: Action) => {
            return this.roleService.list();
        })
        .filter(data => data !== null)
      .map((data) => {
            debugger;
            return new RoleActions.GetRoleSuccessAction(data);
        });

    @Effect()
    add_role$: Observable<Action> = this.actions$
        .ofType(RoleActions.ActionTypes.ADD_ROLE)
        .switchMap((action: Action) => {
            return this.roleService.create(action.payload)
        })
        .map((data) => {
            return new RoleActions.AddRoleSuccessAction(data);
        });


    @Effect()
    edit_role$: Observable<Action> = this.actions$
        .ofType(RoleActions.ActionTypes.EDIT_ROLE)
        .switchMap((action: Action) => {
            return this.roleService.update(action.payload)
        })
        .map((data) => {
            return new RoleActions.EditRoleSuccessAction(data);
        });

    @Effect()
    delete_role$: Observable<Action> = this.actions$
        .ofType(RoleActions.ActionTypes.DELETE_ROLE)
        .switchMap((action: Action) => {
            return this.roleService.delete(action.payload)
        })
        .map((data) => {
            return new RoleActions.DeleteRoleSuccessAction(data);
        });

}
