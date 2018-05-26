import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-workflows',
  templateUrl: './manage-workflows.component.html',
  styleUrls: ['./manage-workflows.component.css']
})
export class ManageWorkflowsComponent implements OnInit {
  workflowTitle: string;
  workflowData: any[];
  constructor() {
    this.workflowTitle = '';
    this.workflowData = [];
  }

  ngOnInit() {
  }

  workflowTitleSubmit(workflowTitle){
    let title = {title: workflowTitle};
    this.workflowData.push(title);
    this.workflowTitle = '';
    console.log('this.workflowData',this.workflowData);
  }

}
