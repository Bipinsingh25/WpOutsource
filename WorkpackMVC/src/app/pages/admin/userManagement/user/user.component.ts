import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Observable } from 'rxjs/Observable';
import { Department } from 'app/models/department';
import { Designation } from 'app/models/designation';
import { Store } from '@ngrx/store';
import { Form, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as fromRoot from './../../../../reducers/index';
import { ToasterService } from 'angular2-toaster';
import { GetDepartmentAction } from './../../../../actions/department.actions';
import { GetDesignationAction } from './../../../../actions/designation.actions';
import { GetAllUserAction, AddUserAction, UpdateUserAction, StartLoader, StopLoader } from 'app/actions/user.actions';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/models/user';
import { GetRoleAction } from 'app/actions/role.actions';
import { FilterNullPipe } from "app/pipes/filterNull.pipe";
import { UserRole } from "app/models/userRole";
import { Role } from "app/models/role";
import * as _ from 'lodash';
import { Messages } from "app/models/AppMessages";
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-userComponent',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  departmentList$: Observable<Department[]>;
  designationList$: Observable<Designation[]>;
  reportingToList$: Observable<User[]>;
  vUserRole: UserRole[] = [];
  formData: FormData = new FormData();

  user: User;
  editingStatus = false;
  @BlockUI('blockUI-list') blockUI: NgBlockUI;

  constructor(private fb: FormBuilder,
    private store: Store<fromRoot.AppState>,
    private activatedRoute: ActivatedRoute,
    private toastr: ToasterService,
    private router: Router,
    private location: Location,
    private message: Messages) {

    if ('id' in this.activatedRoute.snapshot.params) {
      let id = 0;
      const sub = this.activatedRoute.params.subscribe(params => {
        id = +params['id']; // (+) converts string 'id' to a number
      });
      if (id && Number(id) > 0)
        this.editingStatus = true;
    }

  }

  ngOnInit() {

    this.store.select(fromRoot.getIsLoading).subscribe(
      data => {
        if (data) { this.blockUI.start('Loading...'); }
        else { this.blockUI.stop(); }
      }
    );

    this.store.select(fromRoot.getOperationResult).subscribe(
      data => {
        if (data.MessageType == "E") {
          this.message.showMessage(data.message);
        }
        else if (data.MessageType == "S" || data.MessageType == "I") {
          this.message.showMessage(data.Message);
          this.router.navigate(['/userManagement/user']);
        }
      }
    );

    this.vUserRole = this.activatedRoute.snapshot.data['userRole'];
    if (this.editingStatus) {
      this.user = this.activatedRoute.snapshot.data['user'];
      this.initForm(this.user) // handles both the create and edit logic
    } else {
      this.initForm() // handles both the create and edit logic
    }

  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValues = Object.assign({}, this.userForm.value, {
        userRole: this.userForm.value.userRole.map((s, i) => {
          return {
            id: this.vUserRole[i].RoleID,
            selected: s
          }
        })
      });

      var payload = { formValues: formValues, formData:this.formData };

      console.log(payload);
      this.store.dispatch(new StartLoader());
      if (this.editingStatus) {
        formValues.UserID = this.user.UserID;
        this.store.dispatch(new UpdateUserAction(formValues));
      }
      else {
        this.store.dispatch(new AddUserAction(payload));
      }

    }
  }

  initForm(user?: User) {
    this.departmentList$ = this.store.select(fromRoot.getDepartment);
    this.designationList$ = this.store.select(fromRoot.getDesignation);
    this.reportingToList$ = this.store.select(fromRoot.getAllUsers);
    this.store.dispatch(new GetDepartmentAction());
    this.store.dispatch(new GetDesignationAction());
    var vuser = new User();
    this.store.dispatch(new GetAllUserAction(vuser));

    let firstName = '';
    let lastName = '';
    let vEmailId = '';
    let designation = '0';
    let department = '0';
    let reportingTo = '0';
    let isActive = false;


    if (user) {
      firstName = user.FirstName ? user.FirstName : '';
      lastName = user.LastName ? user.LastName : '';
      vEmailId = user.EmailID1 ? user.EmailID1 : '';
      designation = (user.DesignationID ? user.DesignationID.toString() : '0');
      department = (user.DepartmentID ? user.DepartmentID.toString() : '0');
      reportingTo = (user.ReportingTo ? user.ReportingTo.toString() : '0');
      isActive = (user.Status == "A" ? true : false);
    } else {
    }

    this.userForm = this.fb.group({
      'firstName': [firstName, [Validators.required, Validators.minLength(2)]],
      'lastName': [lastName, [Validators.required, Validators.minLength(2)]],
      'emailId': [vEmailId, [Validators.required, this.emailValidator]],
      'designation': [designation, this.selectValidator],
      'department': [department, this.selectValidator],
      'reportingTo': [reportingTo, this.selectValidator],
      'isActive': [isActive],
      'userRole': this.fb.array(
        this.vUserRole.map((data) => this.fb.control(data.RoleAssigned > 0)))
    });

  }

  onFileChange(event) {
    let files = event.target.files;
    this.saveFiles(files);
  }

  saveFiles(files) {
    if (files.length > 0) {
      for (var j = 0; j < files.length; j++) {
        this.formData.append("files[]", files[j], files[j].name);
      }
    }
  }

  userRoleCheckEvent(event, vRoleId) {
    var index = _.findIndex(this.vUserRole, { RoleID: vRoleId });
    let uRItem: UserRole[] = this.vUserRole.filter(data => data.RoleID === vRoleId);
    uRItem[0].RoleAssigned = uRItem[0].RoleAssigned > 0 && event.target.checked ? uRItem[0].RoleAssigned : (event.target.checked ? 1 : 0);
    this.vUserRole.splice(index, 1, uRItem[0]);
    console.log(this.vUserRole);
  }

  goBack() {
    this.location.back();
  }

  // validation

  emailValidator(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  selectValidator(control) {
    if (control.value === "0") {
      return { 'invalidSelect': true };
    } else {
      return null;
    }
  }

  isActiveValidator(control) {
    if (control.value === false) {
      return { 'invalidIsActive': true };
    } else {
      return null;
    }
  }

  userRoleValidation(fa: FormArray) {
    let valid = false;

    for (let x = 0; x < fa.length; ++x) {
      if (fa.at(x).value) {
        valid = true;
        break;
      }
    }
    return valid ? null : {
      multipleCheckboxRequireOne: true
    };
  }

}
