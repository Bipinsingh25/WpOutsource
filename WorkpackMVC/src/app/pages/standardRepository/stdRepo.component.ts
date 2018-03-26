import { Component } from '@angular/core';
import { HotRegisterer } from 'angular-handsontable';


@Component({
  selector: 'app-stdRepo',
  templateUrl: './stdRepo.component.html',
  styleUrls: ['./stdRepo.component.css']
})
export class stdRepoComponent {

  private data: any[];
  private colHeaders: string[];
  private columns: any[];
  private options: any;
  private colWidths: any;

  constructor(private _hotRegisterer: HotRegisterer) {
    this.HtLoadData();
  }

  HtLoadData() {
    this.data = [
      { "DepartmentName": "Architecturexvc", "DepartmentCode": "Arch" },
      ]
    this.data.push([]);
    this.colWidths = [45, 45, 10];
    this.colHeaders = ['Department Name', 'Department Code', ''];
    this.columns = [
      { data: 'DepartmentName', type: 'text' },
      { data: 'DepartmentCode', type: 'text' },
      {
        data: '',
        renderer: function percentRenderer(instance, td, row, col, prop, value, cellProperties) {
          if (row === instance.getData().length - 1) {
            td.innerHTML = "<a class='btn btn-xs green' href= 'javascript:void(0);' style= 'cursor:pointer; text-align:center' id= 'addnewdept' > Add New <i class='fa fa-plus'></i></a> ";
          } else {
            td.innerHTML = "<a class='btn btn-xs red' href='javascript:void(0);' style='cursor:pointer; text-align:center' id='btndepartmentdelete' > Delete <i class='fa fa-trash'></i></a>";
          }
        },
        readOnly: true
      }
    ];
    this.options = {
      height: 396,
      rowHeaders: true,
      stretchH: 'all',
      columnSorting: true,
      contextMenu: true,
      className: 'htCenter htMiddle',
      fillHandle: false
    };

  }

}
