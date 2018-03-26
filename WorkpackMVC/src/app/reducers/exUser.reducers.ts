import { Action } from './action.interface';
import { ExUser } from './../models/exUser';
import { ActionTypes as exUserActions } from './../actions/exUser.actions';

export interface State {
    exUser: ExUser[];
}

const initialState = {
    exUser: [{
        ExUserID: 0,
        ExUser1: '',
        CompanyId: 0,
        Name: '',
        CompanyName: '',
        PhoneNo: '',
        Designation: '',
        Role: '',
        Location: '',
        ContactTypeID: 0,
    }]
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case exUserActions.GET_ALL_EXUSER_SUCCESS: {
            return Object.assign({}, state, {
                exUser: action.payload
            });
        }
        default: {
            return state;
        }
    }
}


// ========================= Exporter functions -==================================

export function getAllExUser(state: State): ExUser[] {
    return state.exUser;
}