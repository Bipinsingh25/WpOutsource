import { SidebarMenu } from './../models/sidebarMenu';
import { createSelector } from 'reselect';
import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/sidebar.actions';
import { Action } from './action.interface';
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface State {
    entities: SidebarMenu[]
}

const initialState = {
    entities: []
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.LOAD_SIDEBARMENU_SUCCESS: {
            const newState = { entities: action.payload };
            return Object.assign({}, state, newState)
        }
        default: {
            return state;
        }
    }
}

export function getSideBarMenu(state: State) {
    return state;
}

