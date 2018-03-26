import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserService } from "./../services/user.service";
import { Observable } from "rxjs/Observable";
import { Action } from './../reducers/action.interface';
import * as UserAction from './../actions/user.actions';
import { User } from "./../models/user";
import * as _ from 'lodash';
import { UserRole } from 'app/models/userRole';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
    private userService: UserService
  ) { }


  @Effect()
  get_all_users$: Observable<Action> = this.actions$
    .ofType(UserAction.ActionTypes.GET_ALL_USERS)
    .switchMap((action: Action) => {
      return this.userService.getAllUsers(action.payload);
    })
    .map((data) => {
      var users = data as User[];
      return new UserAction.GetAllUserSuccessAction(users);
    });

  @Effect()
  GetUsers_ProjectAdminAndMember$: Observable<Action> = this.actions$
    .ofType(UserAction.ActionTypes.GET_USERS_PROJECTADMIN_PROJECTMEMBER)
    .switchMap((action: Action) => {
      return this.userService.getUsersProjectAdminAndMember();
    })
    .map((data) => {
      debugger;
      return new UserAction.GetUsersForProjectAdminAndMemberSuccess(data);
    });

  @Effect()
  add_user$: Observable<Action> = this.actions$
    .ofType(UserAction.ActionTypes.ADD_USER)
    .switchMap((action: Action) => {
      debugger;
      let userRole: UserRole[] = [];
      _.forEach(action.payload.formValues.userRole, function (value) {
        if (value.selected) {
          userRole.push({ UserRolesID: 0, UserID: 0, RoleID: value.id });
        }
      });
      var vUser = {
        UserID: 0,
        CompanyId: 0,
        FirstName: action.payload.formValues.firstName,
        LastName: action.payload.formValues.lastName,
        EmailID1: action.payload.formValues.emailId,
        DepartmentID: action.payload.formValues.department,
        DesignationID: action.payload.formValues.designation,
        ReportingTo: action.payload.formValues.reportingTo,
        Status: action.payload.formValues.isActive ? "A" : "I"
      };
      return this.userService.create(vUser, userRole, action.payload.formData);
    })
    .map((data) => {
      return new UserAction.AddUserSuccessAction(data);
    });

  @Effect()
  update_user$: Observable<Action> = this.actions$
    .ofType(UserAction.ActionTypes.EDIT_USER)
    .switchMap((action: Action) => {
      debugger;
      let userRole: UserRole[] = [];
      _.forEach(action.payload.userRole, function (value) {
        if (value.selected) {
          userRole.push({
            UserRolesID: 0, UserID: action.payload.UserID, RoleID: value.id
          });
        }
      });
      var vUser = {
        UserID: action.payload.UserID,
        CompanyId: 0,
        FirstName: action.payload.firstName,
        LastName: action.payload.lastName,
        EmailID1: action.payload.emailId,
        DepartmentID: action.payload.department,
        DesignationID: action.payload.designation,
        ReportingTo: action.payload.reportingTo,
        Status: action.payload.isActive ? "A" : "I"
      };
      return this.userService.update(vUser, userRole);
    })
    .map((data) => {
      return new UserAction.AddUserSuccessAction(data);
    });



}
