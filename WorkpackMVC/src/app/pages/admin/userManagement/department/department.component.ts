import { Department } from './../../../../models/department';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { HotRegisterer } from 'angular-handsontable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from './../../../../reducers/index';
import { GetDepartmentAction, AddDepartmentAction, EditDepartmentAction, DeleteDepartmentAction } from './../../../../actions/department.actions';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as _ from 'lodash';
import { Messages } from "app/models/AppMessages";



@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

    instance: string = "hotDepartmentInstance";
    @BlockUI('blockUI-list') blockUI: NgBlockUI;

    private data: any[];
    private colHeaders: string[];
    private columns: any[];
    private options: any;
    private colWidths: any;

    departmentList$: Observable<Department[]>;

    public toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center'
    });

    constructor(private store: Store<fromRoot.AppState>,
        private _hotRegisterer: HotRegisterer,
        private toastr: ToasterService,
        private router: Router,
        private message: Messages) {
        this.departmentList$ = this.store.select(fromRoot.getDepartment);
        this.blockUI.start('Loading...')
        this.store.dispatch(new GetDepartmentAction());
        setTimeout(
          this.HTInit(), 15000);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }


    HTInit() {
        debugger;
        this.departmentList$
            .do(() => this.blockUI.start('Loading...'))
            .subscribe(
                data => {
                debugger;
                    if (data !== null) {
                        const vData = _.clone(data);
                        this.HtLoadData(vData);
                        this.blockUI.stop();
                    }
                }
            );
    }

    HtLoadData(vData) {
      debugger;
      console.log(this.data);
        this.data = vData.filter(function (e) { return e && e.DepartmentName });
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

    private afterChange(eve: any) {
        if (eve[0] != null) {
            const source = eve[0][0][2];
            const change = eve[0][0][3];
            if (source === change) {
                return;
            } else {
                const row = eve[0][0][0];
                const hot = this._hotRegisterer.getInstance(this.instance);
                if (row !== hot.getData().length - 1) {
                    this.blockUI.start('Loading...');
                    const selectedData = <Department>hot.getSourceDataAtRow(eve[0][0][0]);
                    const dept = {
                        DepartmentID: selectedData.DepartmentID,
                        DepartmentName: selectedData.DepartmentName,
                        DepartmentCode: selectedData.DepartmentCode
                    };
                    this.store.dispatch(new EditDepartmentAction(dept));
                    this.blockUI.stop();
                    this.message.showMessage(this.message.EditSuccessMessage);
                }
            }
        }
    }

    private mousedown(e: any) {
        const hot = this._hotRegisterer.getInstance(this.instance);
        if (e.target.id === 'addnewdept') {
            this.blockUI.start('Loading...');
            const indexArr = hot.getSelected();
            const selectedData = <Department>hot.getSourceDataAtRow(indexArr[0]);

            const dept = {
                DepartmentID: selectedData.DepartmentID ? 0 : selectedData.DepartmentID,
                DepartmentName: selectedData.DepartmentName,
                DepartmentCode: selectedData.DepartmentCode
            };

            this.store.dispatch(new AddDepartmentAction(dept));
            this.blockUI.stop();
            this.message.showMessage(this.message.AddSuccessMessage);
        }

        else if (e.target.id === 'btndepartmentdelete') {
            this.blockUI.start('Loading...');
            const indexArr = hot.getSelected();
            const selectedData = <Department>hot.getSourceDataAtRow(indexArr[0]);
            hot.alter('remove_row', indexArr[0]);
            const dept = {
                DepartmentID: selectedData.DepartmentID,
                DepartmentName: selectedData.DepartmentName,
                DepartmentCode: selectedData.DepartmentCode
            };

            this.store.dispatch(new DeleteDepartmentAction(dept));
            this.blockUI.stop();
            this.message.showMessage(this.message.DeleteSuccessMessage);
        }
    }

}
