import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Dashboard} from '../../models/dashboard';
import * as fromRoot from './../../reducers/index';
import {Store} from '@ngrx/store';
import {
  GetDashboardAction, GetDashboardMenuListAction,
  GetDashboardSuccessAction
} from '../../actions/dashboard.actions';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import * as _ from 'lodash';
import {DashboardManage} from '../../models/dashboardManage';
import {DashboardService} from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardList$: Observable<Dashboard[]>;
  dashboardMenuList$: Observable<DashboardManage>;
  dashBoardGridData: any;
  dashBoardMenuListAccess: any;
  @BlockUI('blockUI-list') blockUI: NgBlockUI;
  datastore: any[];
  left: number;
  lefTotal: number;
  lineScale: any;
  lineMoment: any;
  lineMomentTransform: any;
  milestoneData: any[];
  modalPlannedDate: any;
  modalProjectName: string;
  modalTaskName: string;
  vStr: string;

  constructor(private store: Store<fromRoot.AppState>, private dashboardService: DashboardService) {
    this.left = 0;
    this.lefTotal = 1800;
    this.lineMomentTransform = 0;
    this.vStr = "";
    this.lineMoment = "";
    this.milestoneData = [];
    this.dashboardList$ = this.store.select(fromRoot.getDashboard);
    this.dashboardMenuList$ = this.store.select(fromRoot.getDashboardMenuList);
    this.blockUI.start('Loading...');
    this.store.dispatch(new GetDashboardAction());
    this.store.dispatch(new GetDashboardMenuListAction());
  }


  ngOnInit() {
    this.dashboardList$
      .do(() => this.blockUI.start('Loading...'))
      .subscribe(
        data => {
          if (data !== null) {
            this.dashBoardGridData = _.clone(data);
            this.blockUI.stop();
            console.log('this.dashBoardGridData', this.dashBoardGridData);
            this.dashBoardGridData.forEach((gridData) => {
              gridData.lineMomentTransform = 0;
              gridData.left = 0;
            });
          }
        }, err => {
          console.log('Error in retrieving data');
        }
      );

    // Get Dashboard Menu Access
    this.dashboardMenuList$
      .do(() => this.blockUI.start('Loading...'))
      .subscribe(
        data => {
          if (data !== null) {
            this.dashBoardMenuListAccess = _.clone(data);
            this.blockUI.stop();
          }
        }, err => {
          console.log('Error in retrieving data');
        }
      );
  }

  previousPage(dashBoardGridData) {
    this.dashBoardGridData[dashBoardGridData].lineMomentTransform = (this.dashBoardGridData[dashBoardGridData].lineMomentTransform < 0) ? (this.dashBoardGridData[dashBoardGridData].lineMomentTransform + 330) : this.dashBoardGridData[dashBoardGridData].lineMomentTransform;

  }


  nextPage(dashBoardGridData, roadmapData) {
    this.dashBoardGridData[dashBoardGridData].lineMomentTransform = ((this.dashBoardGridData[dashBoardGridData].lineMomentTransform * -1) < (((roadmapData < 10)?(roadmapData - 2):(roadmapData - 3)) * 150)) ? (this.dashBoardGridData[dashBoardGridData].lineMomentTransform - 330) : this.dashBoardGridData[dashBoardGridData].lineMomentTransform;
  }

  circleSpacing(dashBoardGridDataIndex, roadMapDataIndex) {
    if (roadMapDataIndex == 0) {
      return {'color': '#8896a0'};
    }
    this.dashBoardGridData[dashBoardGridDataIndex].left = this.dashBoardGridData[dashBoardGridDataIndex].left + 150;
    return {
      'color': '#8896a0',
      'left': this.dashBoardGridData[dashBoardGridDataIndex].left + 'px',
    };
  }

  lineColoring(dashBoardGridDataIndex) {
    let lineScale = 0;
    this.lineScale = {};
    this.dashBoardGridData[dashBoardGridDataIndex].RoadmapData.forEach((roadMapData, roadMapDataIndex) => {
      if (roadMapData.ActualEndDate) {
        // lineScale = ((roadMapDataIndex - 1) * 0.03) + 0.01;
        //(this.dashBoardGridData[dashBoardGridDataIndex].RoadmapData.length < 6) ? (roadMapDataIndex + 1) :
        lineScale = (((roadMapDataIndex+1)) * 0.07);
        this.lineScale = {
          'transform': 'scaleX(' + lineScale + ')'
        };
      }
    });
  }

  initializeLeft(index) {
    this.dashBoardGridData[index].left = 0;
  }

  getMilestoneData(projectId, taskId, taskTypeId, plannedDate, projectName, taskName) {
    this.milestoneData = [];
    this.vStr = "";
    this.modalPlannedDate = plannedDate;
    this.modalProjectName = projectName;
    this.modalTaskName = taskName;
    this.dashboardService.getMilestoneData(projectId, taskId, taskTypeId).subscribe(data => {
      this.milestoneData = (data) ? _.clone(data) : [];
      console.log('this.milestoneData', this.milestoneData);
      let k = 0;
      this.milestoneData.forEach(milestone => {
        let style = "";
        let test = parseFloat(milestone.OrderByRow) > 0 ? milestone.OrderByRow : "";
        if (milestone.RedirectURL != "") {
          if (test != "") {
            let array = test.split('.');
            if (array.length == 1)
              style = "padding-left:0";
            else if (array.length == 2)
              style = "padding-left:11px";

            else if (array.length == 3)
              style = "padding-left:35px";

            else
              style = "padding-left:" + (35 + 24 * (array.length - 3)) + "px";
          }
          // let url = milestone.RedirectURL;
          let url = 'javascript:void()';
          if (k == 0)
            this.vStr = this.vStr + "<div style='" + style + "; margin-top: 8px;'><a  title='Click to manage task details' style='color:#0088CC;font-size:12px;' href='" + url + "'>" + test + "  " + milestone.ChildTask + " for " + this.modalTaskName + "</a>";
          else
            this.vStr = this.vStr + "<div style='" + style + "; margin-top: 5px;'><a  title='Click to manage task details' style='color:#0088CC;font-size:12px;' href='" + url + "'>" + test + "  " + milestone.ChildTask + "</a>";

          if (milestone.Flag == "1")
            this.vStr = this.vStr + '<span style="position: relative; top: 0; background-color: green;"><i class="fa fa-check" aria-hidden="true"></i></span>';
          this.vStr = this.vStr + "</div>";
          k++;
        }
      });
    }, err => {
      console.log('Error in retrieving data');
    })
  }

}
