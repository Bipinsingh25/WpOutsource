import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {TaskGrid} from '../models/taskGrid';

@Injectable()
export class TaskGridService {

  constructor(private httpClient: HttpClient) {
  }

  public list(): Observable<Array<TaskGrid>> {
    return this.httpClient.get<Array<TaskGrid>>('/api/Dashboard/getDeliverableTaskByUserID?Deliverablelst=0&ProjectStatus=7');
  }
}
