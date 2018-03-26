import { environment } from './../../environments/environment';
import { combineReducers } from '@ngrx/store';
import { compose, ActionReducerMap } from '@ngrx/store';

import * as fromClientReducer from './client.reducers';
import * as fromDepartmentReducer from './department.reducers';
import * as fromDesignationReducer from './designation.reducers';
import * as fromProjectReducer from './project.reducers';
import * as fromProjectTypeReducer from './projectType.reducers';
import * as fromProjectStatusReducer from './projectStatus.reducers';
import * as fromPriorityReducer from './priority.reducers';
import * as fromRoleReducer from './role.reducers';
import * as fromSidebarReducer from './sidebar.reducers';
import * as fromUserReducer from './user.reducer';
import * as fromProjectTemplateReducer from './projectTemplate.reducers';
import * as fromExUserReducer from './exUser.reducers';

import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

export interface AppState {
  client: fromClientReducer.State;
  department: fromDepartmentReducer.State;
  designation: fromDesignationReducer.State;
  project: fromProjectReducer.State;
  projectType: fromProjectTypeReducer.State;
  projectStatus: fromProjectStatusReducer.State;
  priority: fromPriorityReducer.State;
  role: fromRoleReducer.State;
  user: fromUserReducer.State;
  sidebarMenu: fromSidebarReducer.State;
  projectTemplate: fromProjectTemplateReducer.State;
  exUser: fromExUserReducer.State;

}

const reducers = {
  client: fromClientReducer.reducer,
  department: fromDepartmentReducer.reducer,
  designation: fromDesignationReducer.reducer,
  project: fromProjectReducer.reducer,
  projectType: fromProjectTypeReducer.reducer,
  projectStatus: fromProjectStatusReducer.reducer,
  priority: fromPriorityReducer.reducer,
  role: fromRoleReducer.reducer,
  user: fromUserReducer.reducer,
  sidebarMenu: fromSidebarReducer.reducer,
  projectTemplate: fromProjectTemplateReducer.reducer,
  exUser: fromExUserReducer.reducer,

};

export const developmentReducer: ActionReducerMap<AppState> = (reducers);
// compose(storeFreeze, combineReducers)(reducers);
export const productionReducer: ActionReducerMap<AppState> = (reducers);

/**
 *
 *
 * @export
 * @param {*} state
 * @param {*} action
 * @returns
 */
//export function reducer(state: any, action: any): ActionReducerMap<AppState> {
//    if (environment.production) {
//        return productionReducer(state, action);
//    } else {
//        return developmentReducer(state, action);
//    }
//}


// =============  list states and compose methods =====================================================


export function getSidebarState(state: AppState): fromSidebarReducer.State {
  return state.sidebarMenu;
}

export const getSideBarMenu = createSelector(getSidebarState, fromSidebarReducer.getSideBarMenu);

// =============== user-auth states and compose methods ===============================================

export function getUserState(state: AppState): fromUserReducer.State {
  return state && state.user;
}

export const getUserProfile = compose(fromUserReducer.getUserProfile, getUserState);
export const getAuthStatus = compose(fromUserReducer.getAuthStatus, getUserState);
export const getIsLoading = compose(fromUserReducer.getIsLoading, getUserState);
export const getOperationResult = compose(fromUserReducer.getOperationResult, getUserState);
export const getToken = compose(fromUserReducer.getToken, getUserState);
export const getNotification = compose(fromUserReducer.getNotification, getUserState);
export const getAllUsers = compose(fromUserReducer.getAllUsers, getUserState);
export const getUsersForProjectAdminAndProjectMember = compose(fromUserReducer.getUsersForProjectAdminAndProjectMember, getUserState);

// =============== department states and compose methods ===============================================

export function getDepartmentState(state: AppState): fromDepartmentReducer.State {
  return state && state.department;
}

export const getDepartment = compose(fromDepartmentReducer.getDepartment, getDepartmentState);

// =============== role states and compose methods ===============================================

export function getRoleState(state: AppState): fromRoleReducer.State {
  return state && state.role;
}

export const getRole = compose(fromRoleReducer.getRole, getRoleState);


// =============== Designation states and compose methods ===============================================

export function getDesignationState(state: AppState): fromDesignationReducer.State {
  return state && state.designation;
}

export const getDesignation = compose(fromDesignationReducer.getDesignation, getDesignationState);


// =============== Client states and compose methods ===================================================

export function getClientState(state: AppState): fromClientReducer.State {
  return state && state.client;
}

export const getClient = compose(fromClientReducer.getAllClients, getClientState);

// =============== Project state and compose methods ===================================================

export function getProjectState(state: AppState): fromProjectReducer.State {
  return state && state.project;
}

export const getProject = compose(fromProjectReducer.getAllProjects, getProjectState);

// =============== ProjectStatus state and compose methods =============================================

export function getProjectStatusState(state: AppState): fromProjectStatusReducer.State {
  return state && state.projectStatus;
}

export const getProjectStatus = compose(fromProjectStatusReducer.getAllProjectStatus, getProjectStatusState);

// =============== ProjectType state and compose methods =============================================

export function getProjectTypeState(state: AppState): fromProjectTypeReducer.State {
  return state && state.projectType;
}

export const getProjectType = compose(fromProjectTypeReducer.getAllProjectTypes, getProjectTypeState);

// =============== Priority state and compose methods =============================================

export function getPriorityState(state: AppState): fromPriorityReducer.State {
  return state && state.priority;
}

export const getPriority = compose(fromPriorityReducer.getAllPriority, getPriorityState);

// =============== ProjectTemplate state and compose methods =============================================

export function getProjectTemplateState(state: AppState): fromProjectTemplateReducer.State {
  return state && state.projectTemplate;
}

export const getProjectTemplate = compose(fromProjectTemplateReducer.getAllProjectTemplates, getProjectTemplateState);

// =============== ExUser state and compose methods =============================================

export function getExUserState(state: AppState): fromExUserReducer.State {
  return state && state.exUser;
}

export const getExUser = compose(fromExUserReducer.getAllExUser, getExUserState);
