
import { Designation } from '../models/designation';
import { Action } from './action.interface';
import { ActionTypes as designationActions } from './../actions/designation.actions';

export interface State {
    designation: Designation[];
}



const initialState = {
    designation: [{
        DesignationID: null,
        DesignationName: null,
        DesignationCode: null,
     
    }]
}

export function reducer(state = initialState, action: Action): State {
    //debugger;
    switch (action.type) {
        case designationActions.GET_DESIGNATION_LIST_SUCCESS: {
            return Object.assign({}, state, {
                designation: action.payload
            });
        }
        case designationActions.ADD_DESIGNATION_SUCCESS: {
            return {
                ...state,
                designation: [...state.designation, action.payload]
            }
        }
        case designationActions.EDIT_DESIGNATION_SUCCESS: {
            return Object.assign({}, state, {
                designation: state.designation
            });
        }

        case designationActions.DELETE_DESIGNATION_SUCCESS: {
            return Object.assign({}, state, {
                designation: state.designation.filter(comment => comment.DesignationID !== action.payload.DesignationID)
            });
        }
        default: {
            return state;
        }
    }
};

function pushMoreRole(role: Designation, state) {
    const payloaddesignation: Designation[] = [];
    payloaddesignation.push(role[0]);
    return payloaddesignation;
    // add code
}


// ========================= Exporter functions -==================================

export function getDesignation(state: State): Designation[] {
    return state.designation;
}


