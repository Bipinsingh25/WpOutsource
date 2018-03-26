import { Action } from './../reducers/action.interface';
import { ProjectStatus } from './../models/projectStatus';

export const ActionTypes = {
    GET_ALL_PROJECTSTATUS: 'Get all project status',
    GET_ALL_PROJECTSTATUS_SUCCESS: 'Get all project status success',
}

export class GetAllProjectStausAction implements Action {
    type = ActionTypes.GET_ALL_PROJECTSTATUS;
    constructor() { }
}

export class GetAllProjectStatusSuccessAction implements Action {
    type = ActionTypes.GET_ALL_PROJECTSTATUS_SUCCESS;
    constructor(public payload: ProjectStatus[]) { }
}