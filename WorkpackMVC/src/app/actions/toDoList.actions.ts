import {Action} from './../reducers/action.interface';

export const ActionTypes = {
  GET_TO_DO_LIST: 'Get to do list',
  GET_TO_DO_LIST_SUCCESS: 'Get to do list success',

};

export class GetToDoListAction implements Action {
  type = ActionTypes.GET_TO_DO_LIST;

  constructor() {
  }
}

export class GetToDoListSuccessAction implements Action {
  type = ActionTypes.GET_TO_DO_LIST_SUCCESS;

  constructor(public payload: any) {
  }
}
