import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProjectStatus } from './../models/projectStatus';
import { environment } from './../../environments/environment';

@Injectable()
export class ProjectStatusService {
    private apiLink: string = environment.API_ENDPOINT;

    constructor(private httpClient: HttpClient) {
    }

    getAllProjectStatus(): Observable<Array<ProjectStatus>> {

        const projectStatus = [
            {
                ProjectStatusID: 1,
                ProjectStatus: 'Estimation'
            },
            {
                ProjectStatusID: 2,
                ProjectStatus: 'OnGoing'
            }
        ];

        return Observable.of(projectStatus);
    }

    public create(projectStatus: ProjectStatus): Observable<ProjectStatus> {
        return this.httpClient.post<ProjectStatus>('/api/ProjectStatusdata', projectStatus);
    }

    public update(projectStatus: ProjectStatus): Observable<ProjectStatus> {
        return this.httpClient.put<ProjectStatus>('api/ProjectStatusdata', projectStatus);
    }

    public delete(projectStatus: ProjectStatus): Observable<ProjectStatus> {
        return this.httpClient.delete<ProjectStatus>('/api/ProjectStatusdata/' + projectStatus.ProjectStatusID);
    }

    public get(id: string): Observable<ProjectStatus> {
        return this.httpClient.get<ProjectStatus>('/api/ProjectStatusdata/${id}');
    }

    //public get(id: string): Observable<Department> {
    //    return this.httpClient.get<Department>('/api/Departmentdata', {
    //        params: new HttpParams().set("id", id)
    //    });
    //}

    public list(): Observable<Array<ProjectStatus>> {
        return this.httpClient.get<Array<ProjectStatus>>('/api/ProjectStatusdata');
    }

}