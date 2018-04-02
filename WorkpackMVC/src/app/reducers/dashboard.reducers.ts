import {Dashboard} from '../models/dashboard';
import {Action} from './action.interface';
import {ActionTypes as dashboardActions} from './../actions/dashboard.actions';

export interface State {
  dashboard: Dashboard[];
}

const initialState = {
  dashboard: [{
    ProjectID: null,
    ProjectName: '',
    ProjectCode: '',
    StartDate: null,
    EndDate: null,
    Clientname: '',
    ClientCode: null,
    ClientProjectNo: '',
    ProjectStageID: null,
    StageName: '',
    ProjectLeader: '',
  }]
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case dashboardActions.GET_DASHBOARD_PROJECTS_SUCCESS: {
      return Object.assign({}, state, {
        dashboard: action.payload
      });
    }

    default: {
      return state;
    }
  }
}


// ========================= Exporter functions -==================================

export function getDashboard(state: State): Dashboard[] {
  return state.dashboard;
}


