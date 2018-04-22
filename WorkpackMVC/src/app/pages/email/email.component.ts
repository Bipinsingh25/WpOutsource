import {Component, OnInit} from '@angular/core';
import {EmailService} from '../../services/email.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  emailData: any;
  multiSelect: any[] = [];
  reviewAndApproval: any[]=[];
  user: any[] = [];
  reference: any[]=[];

  constructor(private emailService: EmailService) {
    this.emailService.getEmailDetailsVParameters().subscribe(data => {
      if (data) {
        this.emailData = data['lstDict'][0];
        console.log('this.emailData', this.emailData);
      }
    });
  }

  ngOnInit() {
    this.emailService.getListOfUsers().subscribe(data => {
      if (data) {
        this.multiSelect = data;
      }
    })
  }

  postData() {
    this.emailService.postemailDataVParameters(this.user.toString(), this.emailData).subscribe(data => {
      console.log('data', data);
    })
  }


  onReviewAndApprovalChange(event) {
    console.log('event', event);
    if (event) {
      this.reviewAndApproval = event.map(d=>d.UserId + ':Y');
      this.user = this.reviewAndApproval.concat(this.reference);
      console.log('this.user', this.reviewAndApproval,this.user);
    }
  }

/*  onReviewAndApprovalChangeRemove(event) {
    console.log('event', event);
    if (event) {
      this.reviewAndApproval = event.UserId + ':Y';
      this.user = this.user.filter(u => u.UserId !== this.reviewAndApproval);
      this.multiSelect.push(event);
      console.log('this.user', this.user);
    }
  }*/

  onReferenceChange(event) {
    console.log('event', event);
    if (event) {
      this.reference = event.map(d=>d.UserId + ':N');
      this.user = this.reviewAndApproval.concat(this.reference);
      console.log('this.user', this.user);
    }
  }
}
