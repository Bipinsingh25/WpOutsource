import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ProjectType } from "app/models/projectType";
import { Client } from "app/models/client";
import { ProjectStatus } from "app/models/projectStatus";
import { Priority } from "app/models/priority";
import { Project } from "app/models/project";
import * as fromRoot from './../../../../reducers/index';
import { GetAllProjectTypeAction } from "app/actions/projectType.actions";
import { GetAllProjectStausAction } from "app/actions/projectStatus.actions";
import { GetAllProjectAction } from "app/actions/project.actions";
import { GetAllPriorityAction } from "app/actions/priority.actions";
import { GetAllClientAction } from "app/actions/client.actions";
import { GetUsersForProjectAdminAndMember } from "app/actions/user.actions";
import { NormSet } from "app/models/projectTemplate";
import { ExUser } from "app/models/exUser";
import { GetAllProjectTemplateAction } from "app/actions/projectTemplate.actions";
import { GetAllExUserAction } from "app/actions/exUser.actions";

@Component({
  selector: 'app-projectComponent',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  project$: Observable<Project[]>;
  projectType$: Observable<ProjectType[]>;
  client$: Observable<Client[]>;
  projectStatus$: Observable<ProjectStatus[]>;
  priority$: Observable<Priority[]>;
  projectTemplate$: Observable<NormSet[]>;
  exUser$: Observable<ExUser[]>;
  usersForProjectAdminAndProjectMember$: Observable<any>;

  editingStatus = false;

  constructor(private fb: FormBuilder,
    private store: Store<fromRoot.AppState>,
    private activatedRoute: ActivatedRoute,
    private toastr: ToasterService,
    private location: Location) {

  }

  ngOnInit() {
    debugger;
    this.initForm(null);
  }

  initForm(project?: Project) {
    this.projectType$ = this.store.select(fromRoot.getProjectType);
    this.projectStatus$ = this.store.select(fromRoot.getProjectStatus);
    this.project$ = this.store.select(fromRoot.getProject);
    this.priority$ = this.store.select(fromRoot.getPriority);
    this.client$ = this.store.select(fromRoot.getClient);
    this.projectTemplate$ = this.store.select(fromRoot.getProjectTemplate);
    this.exUser$ = this.store.select(fromRoot.getExUser);
    this.usersForProjectAdminAndProjectMember$ = this.store.select(fromRoot.getUsersForProjectAdminAndProjectMember)
    this.store.dispatch(new GetAllProjectTypeAction());
    this.store.dispatch(new GetAllProjectStausAction());
    this.store.dispatch(new GetAllProjectAction());
    this.store.dispatch(new GetAllPriorityAction());
    this.store.dispatch(new GetAllClientAction());
    this.store.dispatch(new GetUsersForProjectAdminAndMember());
    this.store.dispatch(new GetAllProjectTemplateAction());
    this.store.dispatch(new GetAllExUserAction());


    let projectName = '';
    let projectType = '0';
    let projectNo = '';
    let projectDesc = '';
    let projectManager = '';
    let client = '0';
    let projectStatus = '0';
    let priority = '0';
    let startDate = '';
    let endDate = '0';
    let projectTemplate = '0';
    let projectLocation = '';
    let projectAdmin = '0';
    let projectMember = '0';
    let externalMembers = '0';
    let similarProjects = '0';

    this.projectForm = this.fb.group({
      'projectName': [projectName, [Validators.required, Validators.minLength(2)]],
      'projectType': [projectType],
      'projectNo': [projectNo, [Validators.required, this.projectnoValidator]],
      'projectDesc': [projectDesc, [Validators.required, Validators.minLength(4)]],
      'projectManager': [projectManager],
      'client': [client],
      'projectStatus': [projectStatus, [this.selectValidator]],
      'priority': [priority, [this.selectValidator]],
      'startDate': [startDate],
      'endDate': [endDate],
      'projectTemplate': [projectTemplate],
      'projectLocation': [projectLocation],
      'projectAdmin': [projectAdmin],
      'projectMember': [projectMember],
      'externalMembers': [externalMembers],
      'similarProjects': [similarProjects]
    });

  }

  onSubmit() {
    debugger;
    alert(this.projectForm.valid);
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {
      const values = this.projectForm.value;
      console.log(values);
      // this.store.dispatch();
    }
  }


  // Validation

  projectnoValidator(control) {
    return null;
  }

  selectValidator(control) {
    if (control.value === "0") {
      return { 'invalidSelect': true };
    } else {
      return null;
    }
  }


}
