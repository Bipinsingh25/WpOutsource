import { Action } from './action.interface';
import { Observable } from 'rxjs/Observable';
import { ActionTypes as clientActions } from './../actions/client.actions';
import { Client } from './../models/client';

export interface State {
    clients: Client[]
}

const initialState = {
    clients: []
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case clientActions.GET_ALL_CLIENT_SUCCESS: {
            return Object.assign({}, state, {
                clients: action.payload
            });
        }
        default:
            return state;
    }
}


// ============================ exporter function ==============================

export function getAllClients(state: State): Client[] {
    return state.clients;
}