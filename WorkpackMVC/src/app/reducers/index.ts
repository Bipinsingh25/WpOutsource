import {environment} from './../../environments/environment';
import {combineReducers} from '@ngrx/store';
import {compose, ActionReducerMap} from '@ngrx/store';

import * as fromClientReducer from './client.reducers';
import * as fromDepartmentReducer from './department.reducers';
import * as fromDesignationReducer from './designation.reducers';
import * as fromDashboardReducer from './dashboard.reducers';
import * as fromToDoListReducer from './toDoList.reducers';
import * as fromActivityLogReducer from './activity.log.reducers';
import * as fromProjectReducer from './project.reducers';
import * as fromProjectTypeReducer from './projectType.reducers';
import * as fromProjectStatusReducer from './projectStatus.reducers';
import * as fromPriorityReducer from './priority.reducers';
import * as fromRoleReducer from './role.reducers';
import * as fromSidebarReducer from './sidebar.reducers';
import * as fromUserReducer from './user.reducer';
import * as fromProjectTemplateReducer from './projectTemplate.reducers';
import * as fromExUserReducer from './exUser.reducers';
import * as fromUserProfileReducer from './user.profile.reducers';
import * as fromTaskGridReducer from './task.grid.reducers';

import {storeFreeze} from 'ngrx-store-freeze';
import {createSelector} from 'reselect';

export interface AppState {
  client: fromClientReducer.State;
  department: fromDepartmentReducer.State;
  designation: fromDesignationReducer.State;
  dashboard: fromDashboardReducer.State;
  dashboardMenuList: fromDashboardReducer.State;
  toDoList: fromToDoListReducer.State;
  activityLogProjectList: fromActivityLogReducer.State;
  project: fromProjectReducer.State;
  projectType: fromProjectTypeReducer.State;
  projectStatus: fromProjectStatusReducer.State;
  priority: fromPriorityReducer.State;
  role: fromRoleReducer.State;
  user: fromUserReducer.State;
  sidebarMenu: fromSidebarReducer.State;
  projectTemplate: fromProjectTemplateReducer.State;
  exUser: fromExUserReducer.State;
  userProfileData: fromUserProfileReducer.State;
  taskGridList: fromTaskGridReducer.State;

}

const reducers = {
    client: fromClientReducer.reducer,
    department: fromDepartmentReducer.reducer,
    designation: fromDesignationReducer.reducer,
    dashboard: fromDashboardReducer.reducer,
    dashboardMenuList: fromDashboardReducer.reducer,
    toDoList: fromToDoListReducer.reducer,
    activityLogProjectList: fromActivityLogReducer.reducer,
    project: fromProjectReducer.reducer,
    projectType: fromProjectTypeReducer.reducer,
    projectStatus: fromProjectStatusReducer.reducer,
    priority: fromPriorityReducer.reducer,
    role: fromRoleReducer.reducer,
    user: fromUserReducer.reducer,
    sidebarMenu: fromSidebarReducer.reducer,
    projectTemplate: fromProjectTemplateReducer.reducer,
    exUser: fromExUserReducer.reducer,
    userProfileData: fromUserProfileReducer.reducer,
    taskGridList: fromTaskGridReducer.reducer,
  }
;

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

export const getDepartment = compose(fromDepartmentReducer.getDepartment, getDepartmentState);// =============== department states and compose methods ===============================================

// =============== User Profile states and compose methods ===============================================
export function getUserProfileState(state: AppState): fromUserProfileReducer.State {
  return state && state.userProfileData;
}

export const getUserProfileData = compose(fromUserProfileReducer.getUserProfileData, getUserProfileState);

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

// =============== To Do List states and compose methods ===============================================

export function getToDoListState(state: AppState): fromToDoListReducer.State {
  return state && state.toDoList;
}

export const getToDoList = compose(fromToDoListReducer.getToDoList, getToDoListState);


// =============== Dashboard states and compose methods ===============================================

export function getDashboardState(state: AppState): fromDashboardReducer.State {
  return state && state.dashboard;
}

export const getDashboard = compose(fromDashboardReducer.getDashboard, getDashboardState);

// =============== Task Grid states and compose methods ===============================================

export function getTaskGridState(state: AppState): fromTaskGridReducer.State {
  return state && state.taskGridList;
}

export const getTaskGrid = compose(fromTaskGridReducer.getTaskGridList, getTaskGridState);

// =============== Dashboard Menu List states and compose methods ===============================================

export function getDashboardMenuListState(state: AppState): fromDashboardReducer.State {
  return state && state.dashboardMenuList;
}

export const getDashboardMenuList = compose(fromDashboardReducer.getDashboardMenuList, getDashboardMenuListState);

// =============== Activity Log List of Project states and compose methods ===============================================

export function getActivityLogProjectsState(state: AppState): fromActivityLogReducer.State {
  return state && state.activityLogProjectList;
}

export const getActivityLogProjects = compose(fromActivityLogReducer.getActivityLogProjects, getActivityLogProjectsState);


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
