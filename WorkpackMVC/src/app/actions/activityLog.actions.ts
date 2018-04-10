import {Action} from './../reducers/action.interface';

export const ActionTypes = {
  GET_ACTIVITY_LOG_PROJECTS: 'Get Activity Log projects',
  GET_ACTIVITY_LOG_PROJECTS_SUCCESS: 'Get Activity Log projects success'

};

export class GetActivityLogProjectsAction implements Action {
  type = ActionTypes.GET_ACTIVITY_LOG_PROJECTS;

  constructor() {
  }
}

export class GetActivityLogProjectsSuccessAction implements Action {
  type = ActionTypes.GET_ACTIVITY_LOG_PROJECTS_SUCCESS;

  constructor(public payload: any) {
  }
}
