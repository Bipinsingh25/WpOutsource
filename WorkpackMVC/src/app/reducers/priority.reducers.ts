import { Action } from './action.interface';
import { ActionTypes as priorityAction } from './../actions/priority.actions';
import { Priority } from './../models/priority';

export interface State {
    priority: Priority[]
};

const initialState = {
    priority: []
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case priorityAction.GET_ALL_PRIORITY_SUCCESS: {
            return Object.assign({}, state, {
                priority: action.payload
            });
        }
        default:
            return state;
    }
}


// ==================================== exporter function ===============================

export function getAllPriority(state: State): Priority[] {
    return state.priority;
}