import { Action } from './../reducers/action.interface';
import { Project } from './../models/project';

export const ActionTypes = {
    GET_ALL_PROJECT: 'Get all project',
    GET_ALL_PROJECT_SUCCESS: 'Get all project success'
}

export class GetAllProjectAction implements Action {
    type = ActionTypes.GET_ALL_PROJECT;
    constructor() { }
}

export class GetAllProjectSuccessAction implements Action {
    type = ActionTypes.GET_ALL_PROJECT_SUCCESS;
    constructor(public payload: Project[]) { }
}
