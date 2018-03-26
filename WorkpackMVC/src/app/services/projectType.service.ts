import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../..//environments/environment';
import { Observable } from 'rxjs/Observable';
import { ProjectType } from "app/models/projectType";

@Injectable()
export class ProjectTypeService {

    private apiLink: string = environment.API_ENDPOINT;

    constructor(private httpClient : HttpClient) {
    }

    getProjectTypes(): Observable<Array<ProjectType>> {
        const projectType = [
            {
                ProjectTypeID: 1,
                ProjectType: 'ProjectType 1',
                ProjectTypeCode: 'ProjectTypeCode 1',
            },
            {
                ProjectTypeID: 2,
                ProjectType: 'ProjectType 2',
                ProjectTypeCode: 'ProjectTypeCode 2',
            }
        ];
        return Observable.of(projectType);
    }

    public create(projectType: ProjectType): Observable<ProjectType> {
        return this.httpClient.post<ProjectType>('/api/ProjectTypedata', projectType);
    }

    public update(projectType: ProjectType): Observable<ProjectType> {
        return this.httpClient.put<ProjectType>('api/ProjectTypedata', projectType);
    }

    public delete(projectType: ProjectType): Observable<ProjectType> {
        return this.httpClient.delete<ProjectType>('/api/ProjectTypedata/' + projectType.ProjectTypeID);
    }

    public get(id: string): Observable<ProjectType> {
        return this.httpClient.get<ProjectType>('/api/ProjectTypedata/${id}');
    }

    //public get(id: string): Observable<Department> {
    //    return this.httpClient.get<Department>('/api/Departmentdata', {
    //        params: new HttpParams().set("id", id)
    //    });
    //}

    public list(): Observable<Array<ProjectType>> {
        return this.httpClient.get<Array<ProjectType>>('/api/ProjectTypedata');
    }

}
