import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { ExUser } from './../models/exUser';

@Injectable()
export class ExUserService {
  private apiLink: string = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) {
  }

  public create(exUser: ExUser): Observable<ExUser> {
    return this.httpClient.post<ExUser>('/api/exUsersData', exUser);
  }

  public update(exUser: ExUser): Observable<ExUser> {
    return this.httpClient.put<ExUser>('api/exUsersData', exUser);
  }

  public delete(exUser: ExUser): Observable<ExUser> {
    return this.httpClient.delete<ExUser>('/api/exUsersData/' + exUser.ExUserID);
  }

  public get(id: string): Observable<ExUser> {
    return this.httpClient.get<ExUser>('/api/exUsersData/${id}');
  }

  //public get(id: string): Observable<ExUser> {
  //    return this.httpClient.get<ExUser>('/api/exUsersData', {
  //        params: new HttpParams().set("id", id)
  //    });
  //}

  public list(): Observable<Array<ExUser>> {
    return this.httpClient.get<Array<ExUser>>('/api/exUsersData');
  }

  getAllExUser(): Observable<Object> {

    const exUser = [
      {
        ExUserID: 1,
        ExUser1: 'test@gmail.com',
        CompanyId: 1,
        Name: 'Test',
        CompanyName: 'Test',
        PhoneNo: '9876543210',
        Designation: 'Sr Engineer',
        Role: 'Admin',
        Location: 'Mumbai',
        ContactTypeID: 1,
      }
    ];

    return Observable.of(exUser);

  }

}
