import { Action } from './../reducers/action.interface';
import { ExUser } from './../models/exUser';

export const ActionTypes = {
    GET_ALL_EXUSER: 'Get all exuser',
    GET_ALL_EXUSER_SUCCESS: 'Get all exuser success'
};

export class GetAllExUserAction implements Action {
    type = ActionTypes.GET_ALL_EXUSER;
    constructor() { }
}

export class GetAllExUserSuccessAction implements Action {
    type = ActionTypes.GET_ALL_EXUSER_SUCCESS;
    constructor(public payload: ExUser[]) { }
}

