import { Action } from './../reducers/action.interface';
import { Priority } from './../models/priority';

export const ActionTypes = {
    GET_ALL_PRIORITY: 'Get all priority',
    GET_ALL_PRIORITY_SUCCESS: 'Get all priority success'
}

export class GetAllPriorityAction implements Action {
    type = ActionTypes.GET_ALL_PRIORITY;
    constructor() { }
}

export class GetAllPrioritySuccessAction implements Action {
    type = ActionTypes.GET_ALL_PRIORITY_SUCCESS;
    constructor(public payload: Priority[]) { }
}
