import { Action } from './../reducers/action.interface';
export const ActionTypes = {
    GET_DESIGNATION_LIST: 'Get designation list',
    GET_DESIGNATION_LIST_SUCCESS: 'Get designation list success',
    ADD_DESIGNATION: 'Add designation',
    ADD_DESIGNATION_SUCCESS: 'Add designation success',
    EDIT_DESIGNATION: 'Edit designation',
    EDIT_DESIGNATION_SUCCESS: 'Edit designation success',
    DELETE_DESIGNATION: 'Delete designation',
    DELETE_DESIGNATION_SUCCESS: 'Delete designation success',
}
export class GetDesignationAction implements Action {    
    type = ActionTypes.GET_DESIGNATION_LIST;
    constructor() { }
}
export class GetDesignationSuccessAction implements Action {
    type = ActionTypes.GET_DESIGNATION_LIST_SUCCESS;
    constructor(public payload: any) { }
}
export class AddDesignationAction implements Action {
    type = ActionTypes.ADD_DESIGNATION;
    constructor(public payload: any) { }
}

export class AddDesignationSuccessAction implements Action {
    type = ActionTypes.ADD_DESIGNATION_SUCCESS;
    constructor(public payload: any) { }
}

export class EditDesignationAction implements Action {
    type = ActionTypes.EDIT_DESIGNATION;
    constructor(public payload: any) { }
}


export class EditDesignationSuccessAction implements Action {
    type = ActionTypes.EDIT_DESIGNATION_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteDesignationAction implements Action {
    type = ActionTypes.DELETE_DESIGNATION;
    constructor(public payload: any) { }
}


export class DeleteDesignationSuccessAction implements Action {
   
    type = ActionTypes.DELETE_DESIGNATION_SUCCESS;
    constructor(public payload: any) { }
}


