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
  logo: any;
  userProfile$: Observable<any[]>;
  @BlockUI('blockUI-list') blockUI: NgBlockUI;
  userProfileData: any;
  userPersonalDetails: any;
  onGoingProjectDetails: any;
  experienceSummary: any;
  skillSummary: any;
  technologySummary: any;
  searchString: string;
  experienceSearchString: string;
  showUserProfile: boolean;
  showManageAccount: boolean;
  experienceSummaryContext: string;
  personalInfoMessage: any;
  oldPassword: string;
  newPassword: string;
  changePasswordMessage:any;
  retypePassword: string;
  emailPassword: string;
  smtpHost: string;
  emailIntegrationMessage: string;

  constructor(private store: Store<fromRoot.AppState>, private userProfileService: UserProfileService) {
    this.showUserProfile = true;
    this.experienceSummaryContext = '';
    this.emailIntegrationMessage = '';
    this.showManageAccount = false;
    this.searchString = '';
    this.experienceSearchString = '';
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
            this.experienceSummary = this.userProfileData[2];
            this.skillSummary = this.userProfileData[3];
            this.technologySummary = this.userProfileData[4];
            this.onGoingProjectDetails = this.userProfileData[5];
            this.blockUI.stop();
          }
        }, err => {
          console.log('Error in retrieving data');
        }
      );
  }

  overview() {
    this.showManageAccount = false;
    this.showUserProfile = true;
  }

  manageAccount() {
    this.showManageAccount = true;
    this.showUserProfile = false;
  }

  postPersonalInfo(location, skills, technology, experience) {
    this.userProfileService.postPersonalInfo(location, skills, technology, experience).subscribe(data => {
      if (data) {
        console.log('data', data);
        this.personalInfoMessage = data;
      }
    })
  }

  changePassword(oldPassword,newPassword,retypePassword){
    if(this.newPassword == retypePassword){
      this.userProfileService.changePassword(this.oldPassword,this.newPassword).subscribe(data => {
        if (data) {
          console.log('data', data);
          this.changePasswordMessage = data;
        }
      })
    } else {
      console.log('Invalid');
    }
  }

  integrateUserSMPT(smtpHost,password){
    this.userProfileService.integrateUserSMPT(smtpHost,password).subscribe(data => {
      if (data) {
        console.log('data', data);
        this.emailIntegrationMessage = data;
      }
    })
  }

  sendSMTPVerificationEmail(smtpHost,password){
    this.userProfileService.sendSMTPVerificationEmail(smtpHost,password).subscribe(data => {
      if (data) {
        console.log('data', data);
        this.emailIntegrationMessage = data;
      }
    })
  }

  onFileChange(fileInput: any){
    this.logo = fileInput.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.logo = e.target.result;
    };

    // reader.readAsDataURL(fileInput.target.files[0]);
  }

}
