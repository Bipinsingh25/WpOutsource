import { Action } from './../reducers/action.interface';
import { ProjectType } from "app/models/projectType";

export const ActionTypes = {
    GET_PROJECTTYPE_LIST: 'Get project type list',
    GET_PROJECTTYPE_LIST_SUCCESS: 'Get project type list success'
}

export class GetAllProjectTypeAction implements Action {
    type = ActionTypes.GET_PROJECTTYPE_LIST;
    constructor() { }
}

export class GetAllProjectTypeSuccessAction implements Action {
    type = ActionTypes.GET_PROJECTTYPE_LIST_SUCCESS;
    constructor(public payload: ProjectType[]) { }
}