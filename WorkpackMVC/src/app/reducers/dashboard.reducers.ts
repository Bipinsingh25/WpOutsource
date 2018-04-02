import {Dashboard} from '../models/dashboard';
import {Action} from './action.interface';
import {ActionTypes as dashboardActions} from './../actions/dashboard.actions';
import {DashboardManage} from '../models/dashboardManage';

export interface State {
  dashboard: Dashboard[];
  dashboardMenuList: DashboardManage;
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
  }],
  dashboardMenuList: {
    "liViewdetails": false,
    "liEditTask": false,
    "liEditMaterialTask": false,
    "liEditDocumentTask": false,
    "liSchedule": false,
    "liprojectcration": false,
    "limanageusers": false
  }
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case dashboardActions.GET_DASHBOARD_PROJECTS_SUCCESS: {
      return Object.assign({}, state, {
        dashboard: action.payload
      });
    }

    case dashboardActions.GET_MENU_LIST_SUCCESS: {
      return Object.assign({}, state, {
        dashboardMenuList: action.payload
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

export function getDashboardMenuList(state: State): DashboardManage {
  return state.dashboardMenuList;
}


