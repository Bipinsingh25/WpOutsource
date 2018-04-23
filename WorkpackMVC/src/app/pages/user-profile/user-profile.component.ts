import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {UserProfileService} from '../../services/user-profile.service';
import {GetUserProfileDataAction} from '../../actions/userProfile.actions';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile$: Observable<any[]>;
  @BlockUI('blockUI-list') blockUI: NgBlockUI;
  userProfileData: any;
  userPersonalDetails:any;
  onGoingProjectDetails:any;
  searchString: string;

  constructor(private store: Store<fromRoot.AppState>, private userProfileService: UserProfileService) {
    this.searchString = '';
    this.userProfile$ = this.store.select(fromRoot.getUserProfileData);
    this.blockUI.start('Loading...');
    this.store.dispatch(new GetUserProfileDataAction());
  }


  ngOnInit() {
    this.userProfile$
      .do(() => this.blockUI.start('Loading...'))
      .subscribe(
        data => {
          if (data && data.length > 0) {
            this.userProfileData = _.clone(data);
            console.log('this.userProfileData', this.userProfileData);
            this.userPersonalDetails = this.userProfileData[0];
            this.onGoingProjectDetails = this.userProfileData[5];
            this.blockUI.stop();
          }
        }, err => {
          console.log('Error in retrieving data');
        }
      );
  }

}
