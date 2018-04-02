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

  constructor(private store: Store<fromRoot.AppState>) {
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
          debugger;
          if (data !== null) {
            this.dashBoardGridData = _.clone(data);
            this.blockUI.stop();
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

}
