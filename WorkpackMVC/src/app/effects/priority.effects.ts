import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from './../reducers/action.interface';
import { Observable } from 'rxjs/Observable';
import * as PriorityActions from './../actions/priority.actions';
import { PriorityService } from './../services/priority.service';
import { Priority } from './../models/priority';

@Injectable()
export class PriorityEffects {
    constructor(private actions$: Actions,
        private priorityService: PriorityService) { }

    @Effect()
    get_all_priority$: Observable<Action> = this.actions$
        .ofType(PriorityActions.ActionTypes.GET_ALL_PRIORITY)
        .switchMap((action: Action) => {
            return this.priorityService.list();
        })
        .map((data) => {
            var priority = data as Priority[];
            return new PriorityActions.GetAllPrioritySuccessAction(priority);
        });

}
