import { Action } from './../reducers/action.interface';
import { NormSet } from './../models/projectTemplate';

export const ActionTypes = {
  GET_PROJECT_TEMPLATE_LIST: 'Get project template lsit',
  GET_PROJECT_TEMPLATE_LIST_SUCCESS: 'Get project template success'
}

export class GetAllProjectTemplateAction implements Action {
  type = ActionTypes.GET_PROJECT_TEMPLATE_LIST;
  constructor() { }
}

export class GetAllProjectTemplateSuccessAction implements Action {
  type = ActionTypes.GET_PROJECT_TEMPLATE_LIST_SUCCESS;
  constructor(public payload: NormSet[]) { }
}
