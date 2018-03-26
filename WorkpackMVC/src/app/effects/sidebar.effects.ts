import * as TripsActions from './../actions/sidebar.actions';
import { Store } from '@ngrx/store';
import { Action } from './../reducers/action.interface';
import { Observable } from 'rxjs/Observable';
import { SidebarService } from './../services/sidebar.service';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SidebarMenu } from '../models/sidebarMenu';
import * as MenuActions from './../actions/sidebar.actions';

@Injectable()
export class MenuEffects {

    constructor(private actions$: Actions,
        private sidebarService: SidebarService) { }

    // tslint:disable-next-line:member-ordering
    @Effect()
    SideBarMenus$: Observable<Action> = this.actions$
        .ofType(TripsActions.ActionTypes.LOAD_SIDEBARMENU)
        .switchMap<Action, SidebarMenu[] | String>((action: Action) => this.sidebarService.getMenus(action.payload))
        .map((data: SidebarMenu[]) => new MenuActions.SidebarMenuLoadedAction(data));

}
