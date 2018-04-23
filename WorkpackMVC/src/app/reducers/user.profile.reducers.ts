import {Action} from './action.interface';
import {ActionTypes as userProfileActions} from '../actions/userProfile.actions';

export interface State {
  userProfileData: any[];
}

const initialState = {
  userProfileData: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case userProfileActions.GET_USER_PROFILE_DATA_SUCCESS: {
      return Object.assign({}, state, {
        userProfileData: action.payload
      });
    }
    default: {
      return state;
    }
  }
}


// ========================= Exporter functions -==================================

export function getUserProfileData(state: State): any[] {
  return state.userProfileData;
}


