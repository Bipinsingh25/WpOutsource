import { Action } from './action.interface';
import { Observable } from 'rxjs/Observable';
import { ActionTypes as projectStatusAction } from './../actions/projectStatus.actions';
import { ProjectStatus } from './../models/projectStatus';

export interface State {
    projectStatus: ProjectStatus[]
};

const initialState = {
    projectStatus: []
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case projectStatusAction.GET_ALL_PROJECTSTATUS_SUCCESS: {
            return Object.assign({}, state, {
                projectStatus: action.payload
            });
        }
        default:
            return state;
    }
}


// ========================= exporter function ===================================


export function getAllProjectStatus(state: State): ProjectStatus[] {
    return state.projectStatus;
}
