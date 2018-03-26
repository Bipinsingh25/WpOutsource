import { Observable } from 'rxjs/Observable';
import { ActionTypes as projectTypeActions } from './../actions/projectType.actions';
import { Action } from './action.interface';
import { ProjectType } from './../models/projectType';

export interface State {
    projectTypes: ProjectType[]
}

const initialState = {
    projectTypes: []
}

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case projectTypeActions.GET_PROJECTTYPE_LIST_SUCCESS: {
            return Object.assign({}, state, {
                projectTypes: action.payload
            });
        }
        default: {
            return state;
        }
    }
}

// ================================ Exporter functions ===========================

export function getAllProjectTypes(state: State): ProjectType[] {
    return state.projectTypes;
}