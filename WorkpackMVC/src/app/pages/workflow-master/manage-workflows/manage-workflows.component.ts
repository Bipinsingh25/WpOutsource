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
    let title = {
      title: workflowTitle, lineMomentTransform : 0,
      left: 0,
      roadmapData: [{taskName: 'A'},{taskName: 'B'},{taskName: 'C'},{taskName: 'D'}]
    };
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


  previousPage(dashBoardGridData) {
    this.workflowData[dashBoardGridData].lineMomentTransform = (this.workflowData[dashBoardGridData].lineMomentTransform < 0) ? (this.workflowData[dashBoardGridData].lineMomentTransform + 330) : this.workflowData[dashBoardGridData].lineMomentTransform;

  }


  nextPage(dashBoardGridData, roadmapData) {
    this.workflowData[dashBoardGridData].lineMomentTransform = ((this.workflowData[dashBoardGridData].lineMomentTransform * -1) < (((roadmapData < 10) ? (roadmapData - 2) : (roadmapData - 3)) * 150)) ? (this.workflowData[dashBoardGridData].lineMomentTransform - 330) : this.workflowData[dashBoardGridData].lineMomentTransform;
  }

  initializeLeft(index) {
    this.workflowData[index].left = 0;
  }

  circleSpacing(dashBoardGridDataIndex, roadMapDataIndex) {
    if (roadMapDataIndex == 0) {
      return {'color': '#8896a0'};
    }
    this.workflowData[dashBoardGridDataIndex].left = this.workflowData[dashBoardGridDataIndex].left + 150;
    return {
      'color': '#8896a0',
      'left': this.workflowData[dashBoardGridDataIndex].left + 'px',
    };
  }

  /*resetTaskTypeSelection(){
    this.tempTaskTypeData = [];
  }*/

  submitTaskTypeSelection() {
    this.workflowData[this.workflowDataSelectedIndex].taskType = this.tempTaskTypeData;
    this.tempTaskTypeData = [];
  }
}
