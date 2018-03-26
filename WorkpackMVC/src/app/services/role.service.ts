import { Observable } from 'rxjs/Observable';
import { Role } from './../models/role';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class RoleService {
    // @LocalStorage() public token:Object = {};
    private apiLink: string = environment.API_ENDPOINT;

    constructor(private httpClient: HttpClient,
        private store: Store<fromRoot.AppState>,
        private router: Router) {
    }

    public create(role: Role): Observable<Role> {
        return this.httpClient.post<Role>('/api/roledata', role);
    }

    public update(role: Role): Observable<Role> {
        return this.httpClient.put<Role>('api/roledata', role);
    }

    public delete(role: Role): Observable<Role> {
        return this.httpClient.delete<Role>('/api/roledata/' + role.RoleID);
    }

    public get(id: string): Observable<Role> {
        return this.httpClient.get<Role>('/api/roledata/${id}');
    }

    //public get(id: string): Observable<Department> {
    //    return this.httpClient.get<Department>('/api/Departmentdata', {
    //        params: new HttpParams().set("id", id)
    //    });
    //}

    public list(): Observable<Array<Role>> {
        return this.httpClient.get<Array<Role>>('/api/roledata');
    }



    //// returns an observable with department object
    //getRole(): Observable<Array<Role>> {
    //    debugger;
    //    var role = [];
    //    //const role = [{
    //    //    RoleID: 1,
    //    //    RoleName: 'Administrator',
    //    //    CreatedBy: 'Support User',
    //    //    CreatedOn: '2013-05-06 00:00:00',
    //    //    ModifiedOn:'2013-12-11 13:01:00' ,
    //    //    ModifiedBy: 'Support User'
    //    //},
    //    //{
    //    //    RoleID: 2,
    //    //    RoleName: 'Support Admin',
    //    //    CreatedBy: 'Support User',
    //    //    CreatedOn: '2013-05-06 00:00:00',
    //    //    ModifiedOn: '2013-12-11 13:01:00',
    //    //    ModifiedBy: 'Support User'
    //    //},
    //    //{
    //    //    RoleID: 3,
    //    //    RoleName: 'Document Owner',
    //    //    CreatedBy: 'Support User',
    //    //    CreatedOn: '2013-05-06 00:00:00',
    //    //    ModifiedOn: '2013-12-11 13:01:00',
    //    //    ModifiedBy: 'Support User'
    //    //},
    //    //{
    //    //    RoleID: 4,
    //    //    RoleName: 'Project Manager',
    //    //    CreatedBy: 'Support User',
    //    //    CreatedOn: '2013-05-06 00:00:00',
    //    //    ModifiedOn: '2013-12-11 13:01:00',
    //    //    ModifiedBy: 'Support User'
    //    //}, {
    //    //    RoleID: 5,
    //    //    RoleName: 'Market Place User',
    //    //    CreatedBy: 'Support User',
    //    //    CreatedOn: '2013-05-06 00:00:00',
    //    //    ModifiedOn: '2013-12-11 13:01:00',
    //    //    ModifiedBy: 'Support User'
    //    //}, {
    //    //    RoleID: 6,
    //    //    RoleName: 'Resource Manager',
    //    //    CreatedBy: 'Support User',
    //    //    CreatedOn: '2013-05-06 00:00:00',
    //    //    ModifiedOn: '2013-12-11 13:01:00',
    //    //    ModifiedBy: 'Support User'
    //    //}];

    //    //const oldItems = JSON.parse(localStorage.getItem('role')) || [];
    //    //if (oldItems.length > 0) {
    //    //    role.push(oldItems[0]);
    //    //}

    //    //return Observable.of(role);

    //    //return this.http.post(`${this.apiLink}/authenticate.json`,
    //    //     JSON.stringify(data), { headers: headers }
    //    // ).map((res: Response) => {
    //    //     // Setting token after login
    //    //     this.setTokenInLocalStorage(res.json())
    //    //     return res.json();
    //    // }).catch((res: Response) => this.catchError(res));

    //    return this.httpClient.get('/api/roledata');

    //    //return Observable.of(role);
       
    //}

    //getServerRole(data): Role[] {

    //    const roleList: Role[] = [];

    //    for (let i = 0; i < data.length; i++) {
    //        const role: Role = {
    //            RoleID: null,
    //            RoleName: null,
    //            CreatedBy: null,
    //            CreatedOn: null,
    //            ModifiedOn: null,
    //            ModifiedBy: null,
    //        };
    //        role.RoleID = data[i].RoleID;
    //        role.RoleName = data[i].RoleName;
    //        role.CreatedBy = data[i].CreatedBy;
    //        role.CreatedOn = data[i].CreatedOn;
    //        role.ModifiedOn = data[i].ModifiedOn;
    //        role.ModifiedBy = data[i].ModifiedBy;

    //        roleList.push(role);
    //    }

    //    return roleList;
    //}

    //addRole(data): Observable<Object> {
    //    //debugger;
    //    const role = this.getServerRole(data);
    //    //console.log(dept);
    //    localStorage.setItem('role', JSON.stringify(role));
    //    return this.http.post('api/roledata', JSON.stringify(role[0]), this.options).map(this.extractData)
    //        .catch(this.handleError)

    //    //return Observable.of(data);
    //}

    //editRole(data): Observable<Object> {
    //   // debugger;
    //    const role = this.getServerRole(data);
    //   return this.http.put('api/roledata', JSON.stringify(role[0]), this.options).map(this.extractData)
    //        .catch(this.handleError)
            
           

    //    //return Observable.of(role);
    //}
    //private extractData(res: Response) {
    //    var array = [];
    //    let body = res.json() as Role;
    //    array.push(body||{});
    //    return array;
    //}
    //deleteRole(data): Observable<Object> {
    //    //debugger;
    //    const dept = this.getServerRole(data);
    //    return this.http.delete('/api/roledata/' + dept[0].RoleID).map(values =>
    //        dept);
    //    //return Observable.of(dept);

    //    //return this.http.get('/api/roledata').map(values =>
    //    //    values.json() as Role);
    //}

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
