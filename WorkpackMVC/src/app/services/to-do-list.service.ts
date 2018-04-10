import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ToDoList} from '../models/toDoList';

@Injectable()
export class ToDoListService {

  constructor(private httpClient: HttpClient) { }

  public getToDoList(): Observable<Array<ToDoList>> {
    return this.httpClient.get<Array<ToDoList>>('/api/projecttasklist/PendingToDoList?ActionName=""&TaskName=""&projectName=""');
  }
}
