
import { Role } from '../models/role';
import { Action } from './action.interface';
import { ActionTypes as roleActions } from './../actions/role.actions';

export interface State {
    role: Role[];
}

const initialState = {
    role: [{
        RoleID: null,
        RoleName: null,
        CreatedBy: null,
        CreatedOn: null,
        ModifiedOn: null,
        ModifiedBy: null,
    }]
}

export function reducer(state = initialState, action: Action): State {
   
    switch (action.type) {
        case roleActions.GET_ROLE_LIST_SUCCESS: {
            console.log(action.payload);
            return Object.assign({}, state, {
                role: action.payload
            });
        }
        case roleActions.ADD_ROLE_SUCCESS: {
            return {
                ...state,
                role: [...state.role, action.payload]
            }
        }
        case roleActions.EDIT_ROLE_SUCCESS: {
            return Object.assign({}, state, {
                role: state.role
            });
        }

        case roleActions.DELETE_ROLE_SUCCESS: {
            return Object.assign({}, state, {
                role: state.role.filter(comment => comment.RoleID !== action.payload.RoleID)
            });
        }
        default: {
            return state;
        }
    }
};

function pushMoreRole(role: Role, state) {
    const payloadRole: Role[] = [];
    payloadRole.push(role[0]);
    return payloadRole;
    // add code
}


// ========================= Exporter functions -==================================

export function getRole(state: State): Role[] {
    return state.role;
}


