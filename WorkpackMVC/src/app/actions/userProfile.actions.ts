import {Action} from './../reducers/action.interface';

export const ActionTypes = {
  GET_USER_PROFILE_DATA: 'Get user profile data',
  GET_USER_PROFILE_DATA_SUCCESS: 'Get user profile data success'

};

export class GetUserProfileDataAction implements Action {
  type = ActionTypes.GET_USER_PROFILE_DATA;

  constructor() {
  }
}

export class GetUserProfileDataSuccessAction implements Action {
  type = ActionTypes.GET_USER_PROFILE_DATA_SUCCESS;

  constructor(public payload: any) {
  }
}
