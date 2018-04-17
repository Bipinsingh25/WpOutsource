import {Component, OnInit} from '@angular/core';
import {EmailService} from '../../services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  emailData: any;
  multiSelect: any[] = [{id: 1, name: 'Pushkar Gaikwad(pushkargaikwad@workpack.in)'}, {
    id: 2,
    name: 'Bipin Singh(bipin.singh@workpack.in)'
  }, {id: 3, name: 'Mangesh(mangesh@workpack.in)'}];

  constructor(private emailService: EmailService) {
    this.emailService.getEmailDetailsVParameters().subscribe(data => {
      if (data) {
        this.emailData = data['lstDict'][0];
        console.log('this.emailData', this.emailData);
      }
    })
  }

  ngOnInit() {
  }

  onReviewAndApprovalChange(event) {
    console.log('event', event);
  }
}
