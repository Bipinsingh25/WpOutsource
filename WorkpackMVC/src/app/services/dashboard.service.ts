import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Dashboard} from '../models/dashboard';
import {DashboardManage} from '../models/dashboardManage';

@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) {
  }


  public list(endIndex: number = 100): Observable<Array<Dashboard>> {
    return this.httpClient.get<Array<Dashboard>>('/api/Dashboard/GetDashboardProjectsData?searchText=""&startIndex=1&endIndex=' + endIndex + '&projectStatus=7');
  }

  public getMenuList(): Observable<DashboardManage> {
    return this.httpClient.get<DashboardManage>('/api/Dashboard/GetMenuList');
  }

  public getMilestonesByProjectId(projectId: number): Observable<any> {
    return this.httpClient.get('/api/Dashboard/getMilestoneTaskByProjectID?ProjectID=' + projectId)
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  public getMilestoneData(projectId: number, taskId: number, taskTypeId: number): Observable<any> {
    return this.httpClient.get('/api/Dashboard/GetPrediccessorTask?ProjectID=' + projectId + '&TaskID=' + taskId + '&TaskTypeId=' + taskTypeId)
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }
}
