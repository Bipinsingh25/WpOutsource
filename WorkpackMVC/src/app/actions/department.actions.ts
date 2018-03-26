import { Action } from './../reducers/action.interface';
import { Department } from "./../models/department";

export const ActionTypes = {
    GET_DEPARTMENT_LIST: 'Get department list',
    GET_DEPARTMENT_LIST_SUCCESS: 'Get department list success',
    ADD_DEPARTMENT: 'Add department',
    ADD_DEPARTMENT_SUCCESS: 'Add department success',
    ADD_DEPARTMENT_ERROR: 'Add department error',
    EDIT_DEPARTMENT: 'Edit department',
    EDIT_DEPARTMENT_SUCCESS: 'Edit department success',
    EDIT_DEPARTMENT_ERROR: 'Edit department error',
    DELETE_DEPARTMENT: 'Delete department',
    DELETE_DEPARTMENT_SUCCESS: 'Delete department success',
    DELETE_DEPARTMENT_ERROR: 'Delete department error',
} 

export class GetDepartmentAction implements Action {
    type = ActionTypes.GET_DEPARTMENT_LIST;
    constructor() { }
}

export class GetDepartmentSuccessAction implements Action {
    type = ActionTypes.GET_DEPARTMENT_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class AddDepartmentAction implements Action {
    type = ActionTypes.ADD_DEPARTMENT;
    constructor(public payload: any) { }
}

export class AddDepartmentSuccessAction implements Action {
    type = ActionTypes.ADD_DEPARTMENT_SUCCESS;
    constructor(public payload: any) { }
}

export class AddDepartmentErrorAction implements Action {
    type = ActionTypes.ADD_DEPARTMENT_ERROR;
    constructor(public payload: any) { }
}

export class EditDepartmentAction implements Action {
    type = ActionTypes.EDIT_DEPARTMENT;
    constructor(public payload: any) { }
}


export class EditDepartmentSuccessAction implements Action {
    type = ActionTypes.EDIT_DEPARTMENT_SUCCESS;
    constructor(public payload: any) { }
}

export class EditDepartmentErrorAction implements Action {
    type = ActionTypes.EDIT_DEPARTMENT_ERROR;
    constructor(public payload: any) { }
}

export class DeleteDepartmentAction implements Action {
    type = ActionTypes.DELETE_DEPARTMENT;
    constructor(public payload: any) { }
}

export class DeleteDepartmentSuccessAction implements Action {
    type = ActionTypes.DELETE_DEPARTMENT_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteDepartmentErrorAction implements Action {
    type = ActionTypes.DELETE_DEPARTMENT_SUCCESS;
    constructor(public payload: any) { }
}


