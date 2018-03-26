import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { HotRegisterer } from 'angular-handsontable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from './../../../../reducers/index';
import { GetAllUserAction } from './../../../../actions/user.actions';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as _ from 'lodash';
import { User } from "app/models/user";


@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html'
})
export class UserListComponent implements OnInit {

    instance: string = "hotUserInstance";
    @BlockUI('blockUI-list') blockUI: NgBlockUI;

    private data: any[];
    private colHeaders: string[];
    private columns: any[];
    private options: any;
    private colWidths: any;

    userList$: Observable<User[]>;

    public toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center'
    });

    constructor(private store: Store<fromRoot.AppState>,
        private _hotRegisterer: HotRegisterer,
        private toastr: ToasterService,
        private router: Router) {
        debugger;
        this.blockUI.start('Loading...');
        this.userList$ = this.store.select(fromRoot.getAllUsers);
        var user = new User();
        this.store.dispatch(new GetAllUserAction(user));
        this.blockUI.stop();
        // this.HTInit();
    }

    ngOnInit() {
    }

    HTInit() {
        debugger;
        this.userList$.subscribe(
            data => {
                if (data !== null) {
                    const vData = _.clone(data);
                    this.HtLoadData(vData);
                }
            }
        )
    }

    HtLoadData(vData) {
        debugger;
        this.data = vData.filter(function (e) { return e.FirstName });
        this.colWidths = [21, 21, 21, 21, 14];
        this.colHeaders = ['First Name', 'Last Name', 'Dept.', 'Desig.', ''];
        this.columns = [
            { data: 'FirstName', type: 'text' },
            { data: 'LastName', type: 'text' },
            { data: 'DepartmentName', type: 'text' },
            { data: 'DesignationName', type: 'text' },
            {
                data: '',
                renderer: function percentRenderer(instance, td, row, col, prop, value, cellProperties) {
                    var rowData = instance.getSourceDataAtRow(row);
                    td.innerHTML = "<a class='btn btn-xs green' href= 'javascript:void(0);' userId='" + rowData.UserID + "' style= 'cursor:pointer; text-align:center' id= 'editUser' > Edit <i class='fa fa-pencil'></i></a>&nbsp;" +
                        "<a class='btn btn-xs red' href= 'javascript:void(0);' userId='" + rowData.UserID + "' style= 'cursor:pointer; text-align:center' id= 'btndepartmentdelete' > Delete <i class='fa fa-trash' > </i></a> ";
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

        this.blockUI.stop();

    }

    private mousedown(e: any) {
        if (e.target.id === 'editUser') {
            const id = e.target.attributes["userid"].value;
            if (id) {
                this.router.navigate(['/userManagement/user', id]);
            }
        }
    }

}
