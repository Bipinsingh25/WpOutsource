import { Department } from '../models/department';
import { Action } from './action.interface';
import { ActionTypes as departmentActions } from './../actions/department.actions';

export interface State {
    department: Department[];
}

const initialState = {
    department: [{
        DepartmentID: null,
        DepartmentName: null,
        DepartmentCode: null,
    }]
}

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case departmentActions.GET_DEPARTMENT_LIST_SUCCESS: {
            return Object.assign({}, state, {
                department: action.payload
            });
        }
        case departmentActions.ADD_DEPARTMENT_SUCCESS: {
            return {
                ...state,
                department: [...state.department, action.payload]
           }
        }
        case departmentActions.EDIT_DEPARTMENT_SUCCESS: {
            return Object.assign({}, state, {
                department: state.department
            });
        }
        case departmentActions.DELETE_DEPARTMENT_SUCCESS: {
            //const { DepartmentID, DepartmentName, DepartmentCode } = action.payload[0];
            //console.log(state);
            return Object.assign({}, state, {
                department: state.department.filter(comment => comment.DepartmentID !== action.payload.DepartmentID)
            });
        }
        default: {
            return state;
        }
    }
};

function pushMoreDepartment(department: Department, state) {
    const payloadDepartment: Department[] = [];
    payloadDepartment.push(department[0]);
    return payloadDepartment;
    // add code
}


// ========================= Exporter functions -==================================

export function getDepartment(state: State): Department[] {
    return state.department;
}


