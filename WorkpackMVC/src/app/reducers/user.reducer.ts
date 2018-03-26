import { Observable } from 'rxjs/Observable';
import { ActionTypes as userAuthActions } from './../actions/user-auth.action';
import { ActionTypes as userActions } from './../actions/user.actions';
import { Action } from './action.interface';
import { UserProfile } from '../models/user-profile';
import { Notification } from '../models/notification';
import { User } from "app/models/user";


export interface State {
  user: UserProfile;
  auth: any;
  token: any;
  isLoading: boolean;
  OperationResult: any;
  notification: Notification[];
  users: User[];  // All company users
  UsersForProjectAdminAndProjectMember: any[]
}

const initialState = {
  user: new UserProfile(),
  auth: localStorage.getItem('user') ? true : null,
  token: null,
  isLoading: false,
  OperationResult: {},
  notification: [],
  users: [],
  UsersForProjectAdminAndProjectMember: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case userAuthActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload,
        token: action.payload.access_token,
        auth: true
      });
    }
    case userAuthActions.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user: initialState.user,
        auth: false
      });
    }
    case userAuthActions.SERVER_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        token: action.payload.access_token,
        auth: true
      });
    }
    case userAuthActions.SERVER_LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user: initialState.user,
        token: null,
        auth: false
      });
    }
    case userAuthActions.GET_HEADER_NOTIFICATION_SUCCESS: {
      return Object.assign({}, state, {
        notification: action.payload
      })
    }
    case userActions.GET_ALL_USERS_SUCCESS: {
      return Object.assign({}, state, {
        users: action.payload,
        OperationResult: {},
        isLoading: false
      })
    }
    case userActions.GET_USERS_PROJECTADMIN_PROJECTMEMBER_SUCCESS: {
      debugger;
      return Object.assign({}, state, {
        UsersForProjectAdminAndProjectMember: action.payload,
        OperationResult: {},
        isLoading: false
      })
    }
    case userActions.ADD_USER_SUCCESS: {
      return Object.assign({}, state, {
        OperationResult: action.payload,
        isLoading: false
      })
    }
    case userActions.EDIT_USER_SUCCESS: {
      return Object.assign({}, state, {
        OperationResult: action.payload,
        isLoading: false
      })
    }
    case userActions.START_LOADER: {
      return Object.assign({}, state, {
        isLoading: true
      })
    }
    case userActions.STOP_LOADER: {
      return Object.assign({}, state, {
        isLoading: false
      })
    }
    default: {
      return state;
    }
  }
}

// ========================= Exporter functions -==================================

export function getUserProfile(state: State): UserProfile {
  return state.user;
}

export function getNotification(state: State): Notification[] {
  return state.notification;
}

export function getAllUsers(state: State): User[] {
  return state.users;
}

export function getUsersForProjectAdminAndProjectMember(state: State): any[] {
  return state.UsersForProjectAdminAndProjectMember;
}

export function getLoggedInUserId(state: State): string {
  return state.user.UserId;
}

export function getAuthStatus(state: State): any {
  if (localStorage.getItem("token")) {
    return true;
  }
  return state.auth;
}

export function getToken(state: State): any {
  return state.token;
}

export function getIsLoading(state: State): any {
  return state.isLoading;
}

export function getOperationResult(state: State): any {
  return state.OperationResult;
}
