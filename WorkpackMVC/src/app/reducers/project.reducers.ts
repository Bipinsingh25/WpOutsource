import { Action } from './action.interface';
import { Observable } from 'rxjs/Observable';
import { ActionTypes as projectActions } from './../actions/project.actions';
import { Project } from './../models/project';

export interface State {
    projects: Project[]
};

const initialState = {
    projects: []
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
      case projectActions.GET_ALL_PROJECT_SUCCESS: {
        debugger;
            return Object.assign({}, state, {
                projects: action.payload
            });
        }
        default: {
            return state;
        }

    }
}

// ========================= exporter function =============================

export function getAllProjects(state: State): Project[] {
    return state.projects;
}
