import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-manage-workflows',
  templateUrl: './manage-workflows.component.html',
  styleUrls: ['./manage-workflows.component.css']
})
export class ManageWorkflowsComponent implements OnInit {
  workflowTitle: string;
  workflowDataSelectedIndex: number;
  workflowData: any[];
  tempTaskTypeData: any[];
  selectedTaskId: number;
  taskTypesData: any[];

  constructor() {
    this.workflowTitle = '';
    this.workflowData = [];
    this.taskTypesData = [];
    this.workflowDataSelectedIndex = null;
    this.selectedTaskId = null;
    this.taskTypesData = [{label: "Pushkar Gaikwad", value: "Pushkar Gaikwad", UserId: 1303}, {
      label: "Jeemit Kothari",
      value: "Jeemit Kothari",
      UserId: 1305
    }, {label: "Abhishek Kumar", value: "Abhishek Kumar", UserId: 7622}, {
      label: "bipinsin@gmail.com",
      value: "bipinsin@gmail.com",
      UserId: 1234
    }, {
      label: "jeemitkothari@cubicleprojects.com",
      value: "jeemitkothari@cubicleprojects.com",
      UserId: 1235
    }];
  }

  ngOnInit() {
  }

  workflowTitleSubmit(workflowTitle) {
    let title = {title: workflowTitle};
    this.workflowData.push(title);
    this.workflowTitle = '';
    console.log('this.workflowData', this.workflowData);
  }

  getIndex(index) {
    this.workflowDataSelectedIndex = index;
  }

  onTaskTypeChange(event) {
    this.tempTaskTypeData = event.map(d => d.label);
  }

  /*resetTaskTypeSelection(){
    this.tempTaskTypeData = [];
  }*/

  submitTaskTypeSelection(){
    this.workflowData[this.workflowDataSelectedIndex].taskType = this.tempTaskTypeData;
    this.tempTaskTypeData = [];
  }
}
