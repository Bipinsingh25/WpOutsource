import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from './../reducers/action.interface';
import { Observable } from 'rxjs/Observable';
import * as clientAction from './../actions/client.actions';
import { ClientService } from './../services/client.service';
import { Client } from './../models/client';

@Injectable()
export class ClientEffects {
    constructor(private actions$: Actions,
        private clientService: ClientService) { }

    @Effect()
    get_all_client$: Observable<Action> = this.actions$
        .ofType(clientAction.ActionTypes.GET_ALL_CLIENT)
        .switchMap((action: Action) => {
            return this.clientService.getAllClient();
        })
        .map((data) => {
            return new clientAction.GetAllClientSuccessAction(data);
        });

}