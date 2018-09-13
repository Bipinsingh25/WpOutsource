import {Action} from './../reducers/action.interface';

export const ActionTypes = {
  GET_TASK_GRID: 'Get Task Grid',
  GET_TASK_GRID_SUCCESS: 'Get Task Grid success'

};

export class GetTaskGridAction implements Action {
  type = ActionTypes.GET_TASK_GRID;

  constructor() {
  }
}

export class GetTaskGridSuccessAction implements Action {
  type = ActionTypes.GET_TASK_GRID_SUCCESS;

  constructor(public payload: any) {
  }
}
