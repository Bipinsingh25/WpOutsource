import {Component, OnInit} from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {ActivityLogService} from '../../services/activity-log.service';

@Component({
  selector: 'activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  @BlockUI('blockUI-list') blockUI: NgBlockUI;
  activityLog: any;
  searchString: string;
  constructor(private activityService: ActivityLogService) {
    this.searchString = "test";
  }

  ngOnInit() {
    this.activityService.getActivityLogBytaskID(17577).subscribe(data=>{
      if(data){
        this.activityLog = data['list'][0];
        console.log('this.activityLog',this.activityLog);
      }
    })
  }
}
