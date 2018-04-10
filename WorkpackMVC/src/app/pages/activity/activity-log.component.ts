import {Component, OnInit} from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {ActivityLogService} from '../../services/activity-log.service';
import {Observable} from 'rxjs/Observable';
import {ProjectList} from '../../models/projectList';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import {GetActivityLogProjectsAction} from '../../actions/activityLog.actions';

@Component({
  selector: 'activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  @BlockUI('blockUI-list') blockUI: NgBlockUI;
  projectList$: Observable<ProjectList[]>;
  projectListData: any;
  activityLog: any;
  searchString: string;
  selectedProject: string;
  selectedProjectID: number;
  searchProject: string;
  selectedDeliverable: string;
  selectedDeliverableID: number;
  taskList:any[];
  constructor(private store: Store<fromRoot.AppState>, private activityService: ActivityLogService) {
    this.searchString = '';
    this.selectedProject = '';
    this.searchProject = '';
    this.projectList$ = this.store.select(fromRoot.getActivityLogProjects);
    this.store.dispatch(new GetActivityLogProjectsAction());
  }

  ngOnInit() {
    this.projectList$
      .do(() => this.blockUI.start('Loading...'))
      .subscribe(
        data => {
          if (data !== null) {
            this.projectListData = _.clone(data);
            this.blockUI.stop();
          }
        }, err => {
          console.log('Error in retrieving data');
        }
      );
  }

  onProjectChange(event){
    this.selectedProject = event.ProjectName;
    this.selectedProjectID = event.ProjectID;
    this.activityService.getTaskListByProjectId(this.selectedProjectID).subscribe(data=>{
      if(data){
        this.taskList = data;
      } else {
        this.taskList = [];
      }
    })
  }

  onDeliverableSelect(event){
    this.selectedDeliverable = event.TaskName;
    this.selectedDeliverableID = event.ProjectTaskID;
    this.activityService.getActivityLogBytaskID(this.selectedDeliverableID).subscribe(data=>{
      console.log('data',data);
      if(data){
        this.activityLog = data['list'][0];
      }
    })
  }
}
