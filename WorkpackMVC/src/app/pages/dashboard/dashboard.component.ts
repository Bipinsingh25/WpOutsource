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
  lineScale: any;

  constructor(private store: Store<fromRoot.AppState>, private dashboardService: DashboardService) {
    this.left = 0;
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
            this.dashBoardGridData.forEach((gridData) => {
              gridData.currentPage = 0;
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
    if (this.dashBoardGridData[dashBoardGridData].currentPage > 0) {
      this.dashBoardGridData[dashBoardGridData].currentPage = this.dashBoardGridData[dashBoardGridData].currentPage - 1;
    }
  }

  nextPage(dashBoardGridData, roadmapData) {
    if (this.dashBoardGridData[dashBoardGridData].currentPage < roadmapData - 1) {
      this.dashBoardGridData[dashBoardGridData].currentPage = this.dashBoardGridData[dashBoardGridData].currentPage + 1;
    }
  }

  hideNextPage(dashBoardGridData, roadmapData) {
    return ((this.dashBoardGridData[dashBoardGridData].currentPage + 1) >= roadmapData);
  }

  circleSpacing(roadMapDataIndex) {
    this.left = (roadMapDataIndex > 1) ? this.left + 3 : 0;
    // this.left = this.left + 3;
    return {
      'left': this.left + '%',
    };
  }

  lineColoring(dashBoardGridDataIndex) {
    let lineScale = 0;
    this.lineScale = {};
    this.dashBoardGridData[dashBoardGridDataIndex].RoadmapData.forEach((roadMapData, roadMapDataIndex) => {
      if (roadMapData.ActualEndDate) {
        lineScale = (roadMapDataIndex-1) * 0.03;
        this.lineScale = {
          'transform': 'scaleX(' + lineScale + ')'
        };
      }
    });
  }

  initializeLeft() {
    this.left = 0;
  }

  getMilestones(projectId, milestoneData, index) {
    milestoneData = [];
    this.dashboardService.getMilestonesByProjectId(projectId).subscribe(data => {
      milestoneData = (data) ? _.clone(data) : [];
      // this.dashBoardGridData[index].milestoneData.push({milestoneData: milestoneData});
      return milestoneData;
    }, err => {
    })
  }

}
