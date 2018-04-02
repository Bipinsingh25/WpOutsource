import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../models/dashboard';
import {DashboardManage} from '../models/dashboardManage';

@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) {
  }


  public list(endIndex: number = 100): Observable<Array<Dashboard>> {
    return this.httpClient.get<Array<Dashboard>>('/api/Dashboard/GetDashboardProjects?searchText=""&startIndex=1&endIndex=' + endIndex + '&projectStatus=7');
  }

  public getMenuList(): Observable<DashboardManage> {
    return this.httpClient.get<DashboardManage>('/api/Dashboard/GetMenuList');
  }
}
