import {Dashboard} from '../models/dashboard';
import {Action} from './action.interface';
import {ActionTypes as toDoListActions} from './../actions/toDoList.actions';
import {DashboardManage} from '../models/dashboardManage';
import {ToDoList} from '../models/toDoList';

export interface State {
  toDoList: ToDoList[];
}

const initialState = {
  toDoList: [{
    MileStoneID: null,
    PendingFor: '',
    ProjectTaskID: null,
    ProjectName: '',
    TaskName: '',
    Stage: '',
    FileFolderPath: '',
    Delay: null
  }]
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case toDoListActions.GET_TO_DO_LIST_SUCCESS: {
      return Object.assign({}, state, {
        toDoList: action.payload
      });
    }
    default: {
      return state;
    }
  }
}


// ========================= Exporter functions -==================================

export function getToDoList(state: State): ToDoList[] {
  return state.toDoList;
}


