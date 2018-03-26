import { Injectable } from "@angular/core";
import { AppState } from './../reducers/index';
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Action } from './../reducers/action.interface';
import * as fromRoot from '../reducers';
import { DepartmentService } from "app/services/department.service";
import { Observable } from "rxjs/Observable";
import * as DepartmentActions from './../actions/department.actions';




// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import { of } from "rxjs/observable/of";

@Injectable()
export class DepartmentEffects {

    constructor(private actions$: Actions,
        private departmentService: DepartmentService,
        private store: Store<fromRoot.AppState>) { }

    @Effect()
    get_department$: Observable<Action> = this.actions$
        .ofType(DepartmentActions.ActionTypes.GET_DEPARTMENT_LIST)
        .switchMap((action: Action) => {
            return this.departmentService.list();
        })
        .filter(data => data !== null)
        .map((data) => {
            return new DepartmentActions.GetDepartmentSuccessAction(data);
        });

    @Effect()
    add_department$: Observable<Action> = this.actions$
        .ofType(DepartmentActions.ActionTypes.ADD_DEPARTMENT)
        .switchMap((action: Action) => {
            return this.departmentService.create(action.payload)
                .map((data) => {
                    return new DepartmentActions.AddDepartmentSuccessAction(data)
                })
                .catch(err => { return Observable.of<Action>(new DepartmentActions.AddDepartmentErrorAction(err)) });
        });

    @Effect()
    edit_department$: Observable<Action> = this.actions$
        .ofType(DepartmentActions.ActionTypes.EDIT_DEPARTMENT)
        .switchMap((action: Action) => {
            return this.departmentService.update(action.payload)
        })
        .map((data) => {
            return new DepartmentActions.EditDepartmentSuccessAction(data);
        });

    @Effect()
    delete_department$: Observable<Action> = this.actions$
        .ofType(DepartmentActions.ActionTypes.DELETE_DEPARTMENT)
        .switchMap((action: Action) => {
            return this.departmentService.delete(action.payload)
        })
        .map((data) => {
            return new DepartmentActions.DeleteDepartmentSuccessAction(data);
        });

}