import {Action} from './action.interface';
import {ActionTypes as activityLogActions} from '../actions/activityLog.actions';
import {ProjectList} from '../models/projectList';

export interface State {
  activityLogProjectList: ProjectList[];
}

const initialState = {
  activityLogProjectList: [{
    ProjectID: null,
    ProjectName: ''
  }]
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case activityLogActions.GET_ACTIVITY_LOG_PROJECTS_SUCCESS: {
      return Object.assign({}, state, {
        activityLogProjectList: action.payload
      });
    }
    default: {
      return state;
    }
  }
}


// ========================= Exporter functions -==================================

export function getActivityLogProjects(state: State): ProjectList[] {
  return state.activityLogProjectList;
}


