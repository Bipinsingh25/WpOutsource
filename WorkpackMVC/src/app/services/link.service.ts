import {Injectable} from "@angular/core";


import 'rxjs/add/operator/toPromise';
import {Link} from '../models/link';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LinkService {
  private linkUrl = "api/links";

  constructor(private http: HttpClient) {}

  get(): Observable<Link[]> {
    return this.http.get<Link[]>(this.linkUrl);
  }

  insert(link: Link): Observable<Link> {
    console.log('link', JSON.stringify(link));
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.http.post('/api/insertGanttChartLink', JSON.stringify(link),{headers: headers})
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  update(link: Link): Observable<any> {
    console.log('link', JSON.stringify(link));
    return this.http.put(`/api/updateGanttChartLink/${link.id}`, JSON.stringify(link));
  }

  remove(id: number): Observable<void> {
    return this.http.delete(`/api/deleteGanttChartLink/${id}`)
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }
}
