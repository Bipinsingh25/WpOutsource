import {Action} from './../reducers/action.interface';

export const ActionTypes = {
  GET_DASHBOARD_PROJECTS: 'Get dashboard projects',
  GET_DASHBOARD_PROJECTS_SUCCESS: 'Get dashboard projects success',
  GET_MENU_LIST: 'Get Menu list',
  GET_MENU_LIST_SUCCESS: 'Get Menu list success',

};

export class GetDashboardAction implements Action {
  type = ActionTypes.GET_DASHBOARD_PROJECTS;

  constructor() {
  }
}

export class GetDashboardSuccessAction implements Action {
  type = ActionTypes.GET_DASHBOARD_PROJECTS_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetDashboardMenuListAction implements Action {
  type = ActionTypes.GET_MENU_LIST;

  constructor() {
  }
}

export class GetDashboardMenuListSuccessAction implements Action {
  type = ActionTypes.GET_MENU_LIST_SUCCESS;

  constructor(public payload: any) {
  }
}
