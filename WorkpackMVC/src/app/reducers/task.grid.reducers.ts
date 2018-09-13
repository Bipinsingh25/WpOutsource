import {Action} from './action.interface';
import {ActionTypes as taskGridActions} from '../actions/taskGrid.actions';
import {TaskGrid} from '../models/taskGrid';

export interface State {
  taskGridList: TaskGrid[];
}

const initialState = {
  taskGridList: [{
    ProjectTaskID: null,
    ProjectName: '',
    Type: '',
    TaskName: '',
    TaskOwner: '',
    DepartmentName: '',
    left: 0,
    lineMomentTransform: 0,
    RoadmapData: []
  }]
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case taskGridActions.GET_TASK_GRID_SUCCESS: {
      return Object.assign({}, state, {
        taskGridList: action.payload
      });
    }
    default: {
      return state;
    }
  }
}


// ========================= Exporter functions -==================================

export function getTaskGridList(state: State): TaskGrid[] {
  return state.taskGridList;
}


