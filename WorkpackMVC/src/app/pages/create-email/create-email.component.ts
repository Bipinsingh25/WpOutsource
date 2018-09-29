import{Component, OnInit}from '@angular/core';
import {EmailService}from '../../services/email.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.css']
})
export class CreateEmailComponent implements OnInit {
  emailData: any;
  multiSelect: any[] = [];
  reviewAndApproval: any[] = [];
  user: any[] = [];
  reference: any[] = [];
  file: any[];
  files: any[] = [];

  /* PopUp Inputs */
  popUpData: any;
  selectedProject: string;
  selectedTask: string;
  selectedFolder: string;
  fileData: any;

  constructor(private emailService: EmailService) {
    this.selectedProject = '';
    this.selectedTask = '';
    this.selectedFolder = '';
    this.emailData = {
                      Subject: '',
                      Message: ''
                      };

    this.popUpData = {
                      projects: ['A','B','C'],
                      tasks: ['X', 'Y', 'Z'],
                      folders: ['P', 'Q', 'R'],
                      };

    this.fileData = [{checked: false,
                      id: 123,
                      fileName: 'test',
                      fileSize: '10KB'}];
  }

  ngOnInit() {
    this.emailService.getListOfUsers().subscribe(data => {
      if (data) {
        this.multiSelect = data;
      }
    })
  }

insertIntoMailBox(){
  console.log('this.fileData',this.fileData);
}

  onClickUploadDocument(event) {
    console.log("clicked");
    let file = event.target.files;

    console.log("file: ", file);

    for (let i = 0; i < file.length; i++) {
      let fileInfo = file[i];
      console.log("files are: ", fileInfo);
      this.files.push(fileInfo);

    }
  }

  remove(file: any) {

    console.log("delete file:..", file);

    let index = this.files.indexOf(file);
    this.files.splice(index, 1)

  }

  postData() {
   /* this.emailService.postemailDataVParameters(this.user, this.emailData, this.files).subscribe(data => {
      console.log('data', data);
    })*/
  }


  onReviewAndApprovalChange(event) {
    console.log('event', event);
    if (event) {
      this.reviewAndApproval = event.map(d => d.UserId + ':Y');
      this.user = this.reviewAndApproval.concat(this.reference);
      console.log('this.user', this.reviewAndApproval, this.user);
    }
  }

  onReferenceChange(event) {
    console.log('event', event);
    if (event) {
      this.reference = event.map(d => d.UserId + ':N');
      this.user = this.reviewAndApproval.concat(this.reference);
      console.log('this.user', this.user);
    }
  }
}
