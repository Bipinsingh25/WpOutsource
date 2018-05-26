import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Task} from "app/models/task";

@Injectable()
export class TaskService {
  private taskUrl = "api/tasks";

  constructor(private http: HttpClient) {
  }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  insert(task: Task): Observable<Task> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    console.log('task',JSON.stringify(task));
    return this.http.post('/api/insertGanttChartTask', JSON.stringify(task), {headers: headers})
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }


  update(task: Task): Observable<any> {
    console.log('task',JSON.stringify(task));
    return this.http.put(`/api/updateGanttChartTask/${task.id}`, JSON.stringify(task));
  }

  remove(id: number): Observable<void> {
    return this.http.delete(`/api/deleteGanttChartTask/${id}`)
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }
}
