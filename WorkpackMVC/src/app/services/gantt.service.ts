import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GanttService {

  constructor(private httpClient: HttpClient) { }

  public getChartData(): Observable<any> {
    console.log('service called');
    return this.httpClient.get('/api/ganttChart/GetGanttChartData?projectID=5867')
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }
}
