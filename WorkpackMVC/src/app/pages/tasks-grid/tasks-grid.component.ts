import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as _ from 'lodash';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {TaskGrid} from '../../models/taskGrid';
import {GetTaskGridAction} from '../../actions/taskGrid.actions';

@Component({
  selector: 'app-tasks-grid',
  templateUrl: './tasks-grid.component.html',
  styleUrls: ['./tasks-grid.component.css']
})
export class TasksGridComponent implements OnInit {
  @BlockUI('blockUI-list') blockUI: NgBlockUI;
  datastore: any[];
  lefTotal: number;
  lineScale: any;
  milestoneData: any[];
  taskGridList$: Observable<TaskGrid[]>;
  taskGridData: any;
  searchString: string;
  departmentName: any[];
  type: any[];
  selectedDepartment: string;
  selectedType: string;
  taskName: string;

  constructor(private store: Store<fromRoot.AppState>) {
    this.searchString = '';
    this.taskName = '';
    this.selectedDepartment = '';
    this.selectedType = '';
    this.taskGridList$ = this.store.select(fromRoot.getTaskGrid);
    this.store.dispatch(new GetTaskGridAction());
    this.lefTotal = 1800;
    this.departmentName = [];
    this.type = [];
  }

  ngOnInit() {
    this.taskGridList$
      .do(() => this.blockUI.start('Loading...'))
      .subscribe(
        data => {
          if (data !== null) {
            this.taskGridData = _.clone(data);
            console.log('this.taskGridData', this.taskGridData);
            this.taskGridData.forEach((gridData) => {
              gridData.lineMomentTransform = 0;
              gridData.left = 0;
             this.departmentName.push(gridData.DepartmentName);
             this.type.push(gridData.Type);
            });
            this.departmentName = _.uniq(this.departmentName);
            this.type = _.uniq(this.type);
            this.blockUI.stop();
          }
        }, err => {
          console.log('Error in retrieving data');
        }
      );
  }

  previousPage(taskGridData) {
    this.taskGridData[taskGridData].lineMomentTransform = (this.taskGridData[taskGridData].lineMomentTransform < 0) ? (this.taskGridData[taskGridData].lineMomentTransform + 330) : this.taskGridData[taskGridData].lineMomentTransform;

  }

  nextPage(taskGridData, roadmapData) {
    this.taskGridData[taskGridData].lineMomentTransform = ((this.taskGridData[taskGridData].lineMomentTransform * -1) < (((roadmapData < 10) ? (roadmapData - 2) : (roadmapData - 3)) * 150)) ? (this.taskGridData[taskGridData].lineMomentTransform - 330) : this.taskGridData[taskGridData].lineMomentTransform;
  }

  circleSpacing(taskGridDataIndex, roadMapDataIndex) {
    if (roadMapDataIndex == 0) {
      return {'color': '#8896a0'};
    }
    this.taskGridData[taskGridDataIndex].left = this.taskGridData[taskGridDataIndex].left + 150;
    return {
      'color': '#8896a0',
      'left': this.taskGridData[taskGridDataIndex].left + 'px',
    };
  }

  lineColoring(taskGridDataIndex) {
    let lineScale = 0;
    this.lineScale = {};
    this.taskGridData[taskGridDataIndex].RoadmapData.forEach((roadMapData, roadMapDataIndex) => {
      if (roadMapData.ActualEndDate) {
        // lineScale = ((roadMapDataIndex - 1) * 0.03) + 0.01;
        //(this.taskGridData[taskGridDataIndex].RoadmapData.length < 6) ? (roadMapDataIndex + 1) :
        lineScale = (((roadMapDataIndex)) * 0.0675);
        // lineScale = lineScale + 150;
        this.lineScale = {
          'transform': 'scaleX(' + lineScale + ')'
        };
      }
    });
  }
  initializeLeft(index) {
    this.taskGridData[index].left = 0;
  }
}
