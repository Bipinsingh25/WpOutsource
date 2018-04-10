import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProjectList} from '../models/projectList';

@Injectable()
export class ActivityLogService {

  constructor(private httpClient: HttpClient) { }

  public getActivityLogBytaskID(taskID: number): Observable<any> {
    return this.httpClient.get('/api/ActivityLog/GetActivityLog?taskID=' + taskID)
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  public getProjectList(): Observable<Array<ProjectList>> {
    return this.httpClient.get<Array<ProjectList>>('/api/ActivityLog/Getprojects');
  }

  public getTaskListByProjectId(projectId:number): Observable<any>{
    return this.httpClient.get('/api/ActivityLog/GetAllDelListByProjectID?projectid=' + projectId)
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }
}
