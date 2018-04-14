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
  selectedProject: any;
  selectedProjectID: number;
  searchProject: string;
  selectedDeliverable: string;
  selectedDeliverableID: number;
  taskList: any[];
  selected: number;

  sampleData = [
    {
      id: '0',
      text: 'Cars',
      children: [
        {
          id: 'car1',
          text: 'Car 1'
        },
        {
          id: 'car2',
          text: 'Car 2'
        },
        {
          id: 'car3',
          text: 'Car 3'
        }
      ]
    },
    {
      id: '0',
      text: 'Planes',
      children: [
        {
          id: 'plane1',
          text: 'Plane 1'
        },
        {
          id: 'plane2',
          text: 'Plane 2'
        },
        {
          id: 'plane3',
          text: 'Plane 3'
        }
      ]
    }
  ];

  constructor(private store: Store<fromRoot.AppState>, private activityService: ActivityLogService) {
    this.selected = 0;
    this.searchString = '';
    this.selectedProject = '';
    this.searchProject = '';
    this.selectedDeliverable = '';
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

  onProjectChange(event) {
    console.log('event', event);
    /*this.selectedProject = event.ProjectName;
    this.selectedProjectID = event.ProjectID;*/
    console.log('this.selectedProjectID',this.selectedProjectID);
    this.selectedProject = this.selectedProjectID.toString().split(',');
    console.log('this.selectedProject',this.selectedProject);
    this.selectedDeliverableID = null;
    this.activityService.getTaskListByProjectId(this.selectedProjectID).subscribe(data => {
      if (data) {
        this.taskList = data;
      } else {
        this.taskList = [];
      }
    })
  }

  onDeliverableSelect(event) {
    /*this.selectedDeliverable = event.TaskName;
    this.selectedDeliverableID = event.ProjectTaskID;*/
    console.log('this.selectedDeliverableID',this.selectedDeliverableID);
    this.activityService.getActivityLogBytaskID(this.selectedDeliverableID[0]).subscribe(data => {
      console.log('data', data);
      if (data) {
        this.activityLog = data['list'][0];
      }
    })
  }
}
