import { Action } from './../reducers/action.interface';
import { User } from "./../models/user";
import { UserRole } from 'app/models/userRole';

export const ActionTypes = {
  ADD_USER: 'Add user',
  ADD_USER_SUCCESS: 'Add user success',
  EDIT_USER: 'Edit user',
  EDIT_USER_SUCCESS: 'Edit user success',
  DELETE_USER: 'Delete user',
  DELETE_USER_SUCCESS: 'Delete user success',
  GET_ALL_USERS: 'Get all users',
  GET_ALL_USERS_SUCCESS: 'Get all users success',
  GET_USERS_PROJECTADMIN_PROJECTMEMBER: 'Get all users for project admin and Project members',
  GET_USERS_PROJECTADMIN_PROJECTMEMBER_SUCCESS: 'Get all users for project admin and Project members success',
  START_LOADER: 'Start loader for User',
  STOP_LOADER: 'Stop loader for user',
};


export class StartLoader implements Action {
  type = ActionTypes.START_LOADER;
  constructor() { }
}

export class StopLoader implements Action {
  type = ActionTypes.STOP_LOADER;
  constructor() { }
}

export class GetAllUserAction implements Action {
  type = ActionTypes.GET_ALL_USERS;
  constructor(public payload: User) { }
}

export class GetAllUserSuccessAction implements Action {
  type = ActionTypes.GET_ALL_USERS_SUCCESS;
  constructor(public payload: User[]) { }
}

export class AddUserAction implements Action {
    type = ActionTypes.ADD_USER;
    constructor(public payload:any) { }
}

export class AddUserSuccessAction implements Action {
    type = ActionTypes.ADD_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class UpdateUserAction implements Action {
  type = ActionTypes.EDIT_USER;
  constructor(public payload: any) { }
}

export class UpdateUserSuccessAction implements Action {
  type = ActionTypes.EDIT_USER_SUCCESS;
  constructor(public payload: User) { }
}

export class GetUsersForProjectAdminAndMember implements Action {
  type = ActionTypes.GET_USERS_PROJECTADMIN_PROJECTMEMBER;
  constructor() { }
}

export class GetUsersForProjectAdminAndMemberSuccess implements Action {
  type = ActionTypes.GET_USERS_PROJECTADMIN_PROJECTMEMBER_SUCCESS;
  constructor(public payload: any[]) { }
}

