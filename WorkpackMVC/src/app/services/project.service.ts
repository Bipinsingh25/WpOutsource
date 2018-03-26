import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { Project } from './../models/project';

@Injectable()
export class ProjectService {

  private apiLink: string = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) {
  }

  public create(project: Project): Observable<Project> {
    return this.httpClient.post<Project>('/api/projectdata', project);
  }

  public update(project: Project): Observable<Project> {
    return this.httpClient.put<Project>('api/projectdata', project);
  }

  public delete(project: Project): Observable<Project> {
    return this.httpClient.delete<Project>('/api/projectdata/' + project.ProjectID);
  }

  public get(id: string): Observable<Project> {
    return this.httpClient.get<Project>('/api/projectdata/${id}');
  }

  //public get(id: string): Observable<Department> {
  //    return this.httpClient.get<Department>('/api/Departmentdata', {
  //        params: new HttpParams().set("id", id)
  //    });
  //}

  public list(): Observable<Array<Project>> {
    return this.httpClient.get<Array<Project>>('/api/projectdata');
  }

  getAllProject(): Observable<Array<Project>> {
    const project = [
      {
        ProjectID: 1,
        ProjectType: 1,
        ProjectCode: 'ProjectCode 1',
        ProjectStage: 1,
        ProjectLeader: 1,
        ProjectName: 'ProjectName 1',
        ProjectDescription: 'ProjectDescription 1',
        ProjectStartDate: '10-01-2017',
        ProjectEndDate: '10-03-2017',
        Priority: 1,
        ClientCode: 1,
        ProjectStatus: 1,
        NormSetID: 1,
      },
      {
        ProjectID: 2,
        ProjectType: 2,
        ProjectCode: 'ProjectCode 2',
        ProjectStage: 2,
        ProjectLeader: 2,
        ProjectName: 'ProjectName 2',
        ProjectDescription: 'ProjectDescription 2',
        ProjectStartDate: '10-01-2017',
        ProjectEndDate: '10-03-2017',
        Priority: 2,
        ClientCode: 2,
        ProjectStatus: 2,
        NormSetID: 2,
      }
    ];
    return Observable.of(project);
  }

}
