import { Role } from './../../../../models/role';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Messages } from './../../../../models/AppMessages';
import { ToasterService, Toast } from 'angular2-toaster';
import { HotRegisterer } from 'angular-handsontable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from './../../../../reducers/index';
import { GetRoleAction, AddRoleAction, EditRoleAction, DeleteRoleAction } from './../../../../actions/role.actions';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

    instance: string = "hotRoleInstance";
    @BlockUI('blockUI-list') blockUI: NgBlockUI;

    private data: any[];
    private datastore: any[];
    private colHeaders: string[];
    private columns: any[];
    private options: any;
    private colWidths: any;
    private validationmessage: string;
    roleList$: Observable<Role[]>;



    constructor(private store: Store<fromRoot.AppState>,
        private _hotRegisterer: HotRegisterer,
        private router: Router,
        private toastr: ToasterService,
        private message: Messages) {
        this.roleList$ = this.store.select(fromRoot.getRole);
        this.store.select(fromRoot.getRole).subscribe(
            data => {
                if (data !== null) {
                    this.datastore = data;
                }
            })
        this.store.dispatch(new GetRoleAction());
        this.HTInit();
    }

    ngOnInit() {
    }

    HTInit() {
        this.roleList$.subscribe(
            data => {
                if (data !== null) {
                    const vData = JSON.parse(JSON.stringify(data));
                    this.HtLoadData(vData);
                }
            }
        )
    }

    HtLoadData(vData) {
        debugger;
        this.blockUI.start('Loading...');
        this.datastore;
        this.data = vData.filter(function (e) { return e && e.RoleName });
        this.data.push([]);
        this.colWidths = [94, 10]
        this.colHeaders = ['Role Name', ''];
        this.columns = [
            {
                data: 'RoleName', type: 'text', validator: this.TextValidator, allowInvalid: false
            },
            {
                data: '',
                renderer: function percentRenderer(instance, td, row, col, prop, value, cellProperties) {
                    if (row === instance.getData().length - 1) {
                        td.innerHTML = "<a class='btn btn-xs green' href= 'javascript:void(0);' style= 'cursor:pointer; text-align:center' id= 'addnewrole' > Add New <i class='fa fa-plus'></i></a> ";
                    } else {
                        td.innerHTML = "<a class='btn btn-xs red' href='javascript:void(0);' style='cursor:pointer; text-align:center' id='btnroledelete' > Delete <i class='fa fa-trash'></i></a>";
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
            //afterValidate: function (isValid, value, row, prop, source) {
            //    debugger;
            //    if (!isValid) {
            //        let toast: Toast = { type: 'error', body: this.validationmessage, showCloseButton: true };
            //        this.toastr.pop(toast);
            //    }
            //}
        };

        this.blockUI.stop();

    }
    TextValidator = function (value, callback) {
        
        if (value) {
            
            var data = this.instance.getDataAtCol(this.col);
            var index = data.indexOf(value);

            var valid = true;
            if (index > -1 && this.row !== index) {
                this.message.showMessage(this.message.DuplicateErrormessage);
                valid = false;
            }
            else if (value.length > 50) {
                this.message.showMessage(this.message.MaxLengthexceedsErrormessage);
                valid = false;
            }
            return callback(valid);

        }
        else {

            this.validationmessage = this.Errormessage;
            callback(false);
        }

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
                    this.blockUI.start('Loading...');
                    const selectedData = <Role>hot.getSourceDataAtRow(eve[0][0][0]);
                    const role = {
                        RoleID: selectedData.RoleID,
                        RoleName: selectedData.RoleName,
                        CreatedBy: selectedData.CreatedBy,
                        CreatedOn: selectedData.CreatedOn,
                        ModifiedOn: selectedData.ModifiedOn,
                        ModifiedBy: selectedData.ModifiedBy,
                    };
                    this.store.dispatch(new EditRoleAction(role));

                    this.blockUI.stop();
                    this.message.showMessage(this.message.EditSuccessMessage);
                }
            }
        }
    }

    private mousedown(e: any) {
        if (e.target.id === 'addnewrole') {
            this.blockUI.start('Loading...');
            const hot = this._hotRegisterer.getInstance(this.instance);
            const indexArr = hot.getSelected();
            const selectedData = <Role>hot.getSourceDataAtRow(indexArr[0]);
            const role = {
                RoleID: selectedData.RoleID ? 0 : selectedData.RoleID,
                RoleName: selectedData.RoleName,
                CreatedBy: selectedData.CreatedBy,
                CreatedOn: selectedData.CreatedOn,
                ModifiedOn: selectedData.ModifiedOn,
                ModifiedBy: selectedData.ModifiedBy,
            };
            

            this.store.dispatch(new AddRoleAction(role));
            this.message.showMessage(this.message.AddSuccessMessage);
            // this.hotTableComponent.data.push(selectedData);
            // this.hotTableComponent.data[this.hotTableComponent.inst.getData().length - 1] = [];
            // this.hotTableComponent.inst.render();
        }
        else if (e.target.id === 'btnroledelete') {
            console.log(new Date().getTime());
            this.blockUI.start('Loading...');
            const hot = this._hotRegisterer.getInstance(this.instance);
            const indexArr = hot.getSelected();
            const selectedData = <Role> hot.getSourceDataAtRow(indexArr[0]);
            hot.alter('remove_row', indexArr[0]);
            const role = {
                RoleID: selectedData.RoleID,
                RoleName: selectedData.RoleName,
                CreatedBy: selectedData.CreatedBy,
                CreatedOn: selectedData.CreatedOn,
                ModifiedOn: selectedData.ModifiedOn,
                ModifiedBy: selectedData.ModifiedBy,
            };

            this.store.dispatch(new DeleteRoleAction(role));
            this.blockUI.stop();

            this.blockUI.stop();
            this.message.showMessage(this.message.DeleteSuccessMessage);

            // this.hotTableComponent.data.push(selectedData);
            // this.hotTableComponent.data[this.hotTableComponent.inst.getData().length - 1] = [];
            // this.hotTableComponent.inst.render();
        }
    }

    Duplicationcheck(value: string): boolean {
        const hot = this._hotRegisterer.getInstance(this.instance);
        //let modifieddata= this.hotTableComponent.data
        for (let entry of hot.getData()) {
            if (entry.RoleName == value) {
                return false;
            }
        }
        return true;
    }

}
