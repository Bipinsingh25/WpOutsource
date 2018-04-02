import {Action} from './../reducers/action.interface';

export const ActionTypes = {
  GET_DASHBOARD_PROJECTS: 'Get dashboard projects',
  GET_DASHBOARD_PROJECTS_SUCCESS: 'Get dashboard projects success',

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
