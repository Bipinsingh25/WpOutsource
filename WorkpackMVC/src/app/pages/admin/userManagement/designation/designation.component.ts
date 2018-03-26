import { Designation } from './../../../../models/designation';
import { Messages } from './../../../../models/AppMessages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HotRegisterer } from 'angular-handsontable';
import { ToasterService, Toast } from 'angular2-toaster';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from './../../../../reducers/index';
import { GetDesignationAction, AddDesignationAction, EditDesignationAction, DeleteDesignationAction } from './../../../../actions/designation.actions';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as _ from 'lodash';


@Component({
    selector: 'app-designation',
    templateUrl: './designation.component.html',
    styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

    instance: string = "hotDesignationInstance";
    @BlockUI('designation-list') blockUI: NgBlockUI;

    private data: any[];
    private datastore: any[];
    private colHeaders: string[];
    private columns: any[];
    private options: any;
    private colWidths: any;
    designationList$: Observable<Designation[]>;

    constructor(private store: Store<fromRoot.AppState>,
        private _hotRegisterer: HotRegisterer,
        private router: Router,
        private toastr: ToasterService,
        private message: Messages) {
        this.designationList$ = this.store.select(fromRoot.getDesignation);
        this.store.select(fromRoot.getDesignation).subscribe(
            data => {
                if (data !== null) {
                    this.datastore = data;
                }
            })
        this.store.dispatch(new GetDesignationAction());
        this.HTInit();
    }

    ngOnInit() {
    }

    HTInit() {
        debugger;
        this.designationList$.subscribe(
            data => {
                if (data !== null) {
                    debugger;
                    const vData = JSON.parse(JSON.stringify(data));
                    this.HtLoadData(vData);
                }
            }
        )
    }

    HtLoadData(vData) {
        debugger;
        this.datastore;
        this.data = vData.filter(function (e) { return e.DesignationName });
        this.data.push([]);
        this.colWidths = [47, 47, 10]
        this.colHeaders = ['Designation Name', 'Designation Code', ''];
        this.columns = [

            { data: 'DesignationName', type: 'text', validator: this.TextValidator, allowInvalid: false },

            { data: 'DesignationCode', type: 'text', validator: this.TextValidator, allowInvalid: false },

            {
                data: '',
                renderer: function percentRenderer(instance, td, row, col, prop, value, cellProperties) {
                    if (row === instance.getData().length - 1) {
                        td.innerHTML = "<a class='btn btn-xs green' href= 'javascript:void(0);' style= 'cursor:pointer; text-align:center' id= 'addnewdesignation' > Add New <i class='fa fa-plus'></i></a> ";
                    } else {
                        td.innerHTML = "<a class='btn btn-xs red' href='javascript:void(0);' style='cursor:pointer; text-align:center' id='btndesignationdelete' > Delete <i class='fa fa-trash'></i></a>";
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
            fillHandle: false,
            removeRowPlugin: true,
            afterValidate: function (isValid, value, row, prop, source) {
                if (!isValid) {
                    alert('there exists an invalid cell, disable save');
                }
            }
        };

        this.blockUI.stop();

    }
    TextValidator = function (value, callback) {
        setTimeout(function () {
            if (value) {
                callback(true);
            }
            else {
                callback(false);
            }
        }, 1000);
    };
    private afterChange(eve: any) {
        
        if (eve[0] != null) {

            const source = eve[0][0][2];
            const change = eve[0][0][3];
            if (source === change) {
                return;
            } else {
                const hot = this._hotRegisterer.getInstance(this.instance);
                const row = eve[0][0][0];
                if (row !== hot.getData().length - 1) {
                    debugger;

                    this.blockUI.start('Loading...');
                    const selectedData = <Designation>hot.getSourceDataAtRow(eve[0][0][0]);
                    const designation = {
                        DesignationID: selectedData.DesignationID,
                        DesignationName: selectedData.DesignationName,
                        DesignationCode: selectedData.DesignationCode,
                    };

                    this.store.dispatch(new EditDesignationAction(designation));
                    this.blockUI.stop();
                    this.message.showMessage(this.message.EditSuccessMessage);
                }
            }
        }
    }





    private mousedown(e: any) {

        if (e.target.id === 'addnewdesignation') {

            this.blockUI.start('Loading...');
            const hot = this._hotRegisterer.getInstance(this.instance);
            const indexArr = hot.getSelected();

            const selectedData = <Designation>hot.getSourceDataAtRow(indexArr[0]);
            const Designation = {
                DesignationID: selectedData.DesignationID ? 0 : selectedData.DesignationID,
                DesignationName: selectedData.DesignationName,
                DesignationCode: selectedData.DesignationCode,
            };

            this.store.dispatch(new AddDesignationAction(Designation));
            this.blockUI.stop();
            this.message.showMessage(this.message.AddSuccessMessage);

        }
        else if (e.target.id === 'btndesignationdelete') {
            const hot = this._hotRegisterer.getInstance(this.instance);
            this.blockUI.start('Loading...');
            const indexArr = hot.getSelected();
            const selectedData = <Designation>hot.getSourceDataAtRow(indexArr[0]);
            hot.alter('remove_row', indexArr[0]);
            const Designation = {
                DesignationID: selectedData.DesignationID,
                DesignationName: selectedData.DesignationName,
                DesignationCode: selectedData.DesignationCode,
            };

            this.store.dispatch(new DeleteDesignationAction(Designation));
            this.blockUI.stop();
            this.message.showMessage(this.message.DeleteSuccessMessage);
        }
    }

}
