import { Action } from './../reducers/action.interface';

export const ActionTypes = {
    GET_ROLE_LIST: 'Get role list',
    GET_ROLE_LIST_SUCCESS: 'Get role list success',
    ADD_ROLE: 'Add role',
    ADD_ROLE_SUCCESS: 'Add role success',
    EDIT_ROLE: 'Edit role',
    EDIT_ROLE_SUCCESS: 'Edit role success',
    DELETE_ROLE: 'Delete role',
    DELETE_ROLE_SUCCESS: 'Delete role success',
}

export class GetRoleAction implements Action {
    
    type = ActionTypes.GET_ROLE_LIST;
    constructor() { }
}

export class GetRoleSuccessAction implements Action {
    type = ActionTypes.GET_ROLE_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class AddRoleAction implements Action {
    type = ActionTypes.ADD_ROLE;
    constructor(public payload: any) { }
}

export class AddRoleSuccessAction implements Action {
    type = ActionTypes.ADD_ROLE_SUCCESS;
    constructor(public payload: any) { }
}

export class EditRoleAction implements Action {
    type = ActionTypes.EDIT_ROLE;
    constructor(public payload: any) { }
}


export class EditRoleSuccessAction implements Action {
    type = ActionTypes.EDIT_ROLE_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteRoleAction implements Action {
    type = ActionTypes.DELETE_ROLE;
    constructor(public payload: any) { }
}


export class DeleteRoleSuccessAction implements Action {
   
    type = ActionTypes.DELETE_ROLE_SUCCESS;
    constructor(public payload: any) { }
}


