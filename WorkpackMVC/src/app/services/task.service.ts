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
    return this.http.post(this.taskUrl, JSON.stringify(task), {headers: headers})
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }


  update(task: Task): Observable<any> {
    return this.http.put(`${this.taskUrl}/${task.id}`, JSON.stringify(task));
  }

  remove(id: number): Observable<void> {
    return this.http.delete(`${this.taskUrl}/${id}`)
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
    ;
  }
}
