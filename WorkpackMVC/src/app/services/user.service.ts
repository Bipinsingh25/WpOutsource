import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from './../models/user';
import { UserRole } from 'app/models/userRole';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private apiLink: string = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) {
  }

  public create(vuser: User, vuserRole: UserRole[], vformData): Observable<User> {
    debugger;
    const body = { user: vuser, userRole: vuserRole };
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');

    return this.httpClient.post('api/UsersData/Post', body, { headers: headers })
      .catch(this.handleError);
  }

  public update(vuser: User, vuserRole: UserRole[]): Observable<User> {
    debugger;
    const body = { user: vuser, userRole: vuserRole };
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.put<User>('api/UsersData/Put', body, { headers });
  }

  public delete(user: User): Observable<User> {
    return this.httpClient.delete<User>('/api/UsersData/' + user.UserID);
  }

  public get(id: string): Observable<User> {
    return this.httpClient.get<User>('/api/UsersData/${id}');
  }

  //public get(id: string): Observable<User> {
  //    return this.httpClient.get<User>('/api/UsersData', {
  //        params: new HttpParams().set("id", id)
  //    });
  //}

  public getAllUsers(user): Observable<Object> {
    let Params = new HttpParams({
      fromObject: user
    });
    return this.httpClient.get<Array<User>>('/api/UsersData/Get', { params: Params });
  }

  public getUsersProjectAdminAndMember(): Observable<any[]> {
    return this.httpClient.get<any>('api/UsersData/GetUsersForProjectsAdminAndMembers')
      .catch(this.handleError)
  }

  addUser(vuser: User, vuserRole: UserRole[]): Observable<Object> {
    //localStorage.setItem('user', JSON.stringify(user));
    //return Observable.of(user);
    var user = (vuser);
    var vusrRole = (vuserRole);
    debugger;
    const body = { user: user, userRole: vusrRole };
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post('api/UsersData', body, { headers: headers })
      .catch(this.handleError)
  }

  getUser(id: number): Observable<Object> {
    const User = {
      UserID: id,
      FirstName: 'Bipin' + id,
      LastName: 'Singh' + id,
      EmailID: 'support@gmail.com',
      DepartmentName: 'IT',
      DepartmentID: 29,
      DesignationName: 'Team Lead',
      DesignationID: 23
    };
    return Observable.of(User);
  }



  getUserRoleAssigned(id: any): Observable<Object> {
    let params = new HttpParams().set('id', id);
    return this.httpClient.get('api/UsersData/getUserRoleAssigned', { params: params })
      .catch(this.handleError)
  }

  //private extractData(res: Response) {
  //    var array = [];
  //    let body = res.json() as User;
  //    array.push(body || {});
  //    return array;
  //}

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
