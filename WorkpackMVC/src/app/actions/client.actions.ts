import { Action } from './../reducers/action.interface';
import { Client } from './../models/client';

export const ActionTypes = {
    GET_ALL_CLIENT: 'Get all client',
    GET_ALL_CLIENT_SUCCESS: 'Get all client success'
}

export class GetAllClientAction implements Action {
    type = ActionTypes.GET_ALL_CLIENT;
    constructor() { }
}

export class GetAllClientSuccessAction implements Action {
    type = ActionTypes.GET_ALL_CLIENT_SUCCESS;
    constructor(public payload: Client[]) { }
}