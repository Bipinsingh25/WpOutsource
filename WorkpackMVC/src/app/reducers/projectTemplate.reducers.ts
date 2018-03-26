import { Action } from './action.interface';
import { Observable } from 'rxjs/Observable';
import { ActionTypes as projectTemplateActions } from './../actions/projectTemplate.actions';
import { NormSet } from './../models/projectTemplate';

export interface State {
    projectTemplates: NormSet[]
}

const initialState = {
    projectTemplates: []
}

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case projectTemplateActions.GET_PROJECT_TEMPLATE_LIST_SUCCESS: {
            return Object.assign({}, state, {
                projectTemplates: action.payload
            });
        }
        default:
            return state;
    }
}

// ============================ exporter function ==============================

export function getAllProjectTemplates(state: State): NormSet[] {
    return state.projectTemplates;
}
