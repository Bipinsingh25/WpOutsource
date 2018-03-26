import { Injectable } from "@angular/core";
import { AppState } from './../reducers/index';
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Action } from './../reducers/action.interface';
import * as fromRoot from '../reducers';
import { DesignationService } from "app/services/designation.service";
import { Observable } from "rxjs/Observable";
import * as DesignationActions from './../actions/designation.actions';


// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

@Injectable()
export class DesignationEffects {

    constructor(private actions$: Actions,
        private designationService: DesignationService,
        private store: Store<fromRoot.AppState>) { }

    @Effect()
    get_designation$: Observable<Action> = this.actions$
        .ofType(DesignationActions.ActionTypes.GET_DESIGNATION_LIST)
        .switchMap((action: Action) => {
            return this.designationService.list();
        })
        .filter(data => data !== null)
        .map((data) => {
            return new DesignationActions.GetDesignationSuccessAction(data);
        });

    @Effect()
    add_designation$: Observable<Action> = this.actions$
        .ofType(DesignationActions.ActionTypes.ADD_DESIGNATION)
        .switchMap((action: Action) => {
            return this.designationService.create(action.payload)
        })
        .map((data) => {
            return new DesignationActions.AddDesignationSuccessAction(data);
        });


    @Effect()
    edit_designation$: Observable<Action> = this.actions$
        .ofType(DesignationActions.ActionTypes.EDIT_DESIGNATION)
        .switchMap((action: Action) => {
            return this.designationService.update(action.payload)
        })
        .map((data) => {
            return new DesignationActions.EditDesignationSuccessAction(data);
        });

    @Effect()
    delete_designation$: Observable<Action> = this.actions$
        .ofType(DesignationActions.ActionTypes.DELETE_DESIGNATION)
        .switchMap((action: Action) => {
            return this.designationService.delete(action.payload)
        })
        .map((data) => {
            return new DesignationActions.DeleteDesignationSuccessAction(data);
        });
}
