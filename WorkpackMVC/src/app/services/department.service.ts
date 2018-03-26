import { Observable } from 'rxjs/Observable';
import { Department } from './../models/department';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpObserve } from "@angular/common/http/src/client";

@Injectable()
export class DepartmentService {
    // @LocalStorage() public token:Object = {};
    private apiLink: string = environment.API_ENDPOINT;
    private headers: HttpHeaders;

    constructor(protected httpClient: HttpClient,
        private store: Store<fromRoot.AppState>,
        private router: Router
    ) { }


    public create(department: Department): Observable<Department> {
        return this.httpClient.post<Department>('/api/departmentdata', department);
    }

    public update(department: Department): Observable<Department> {
        return this.httpClient.put<Department>('api/departmentdata', department);
    }

    public delete(department: Department): Observable<Department> {
        return this.httpClient.delete<Department>('/api/departmentdata/' + department.DepartmentID);
    }

    public get(id: string): Observable<Department> {
        return this.httpClient.get<Department>('/api/departmentdata/${id}');
    }

    //public get(id: string): Observable<Department> {
    //    return this.httpClient.get<Department>('/api/Departmentdata', {
    //        params: new HttpParams().set("id", id)
    //    });
    //}

    public list(): Observable<Array<Department>> {
        return this.httpClient.get<Array<Department>>('/api/departmentdata');
    }


    //Old methods with http

    //getDepartment(): Observable<Department[]> {
    //    return this.httpClient.get<Department[]>('/api/departmentdata');
    //}

    //getServerDepartment(data): Department[] {

    //    const dpertmentList: Department[] = [];

    //    for (let i = 0; i < data.length; i++) {
    //        const dept: Department = {
    //            DepartmentID: null,
    //            DepartmentName: null,
    //            DepartmentCode: null
    //        };
    //        dept.DepartmentID = data[i].DepartmentID;
    //        dept.DepartmentName = data[i].DepartmentName;
    //        dept.DepartmentCode = data[i].DepartmentCode;

    //        dpertmentList.push(dept);
    //    }

    //    return dpertmentList;
    //}

    //addDepartment(data): Observable<Object> {
    //    const dept = this.getServerDepartment(data);
    //    localStorage.setItem('department', JSON.stringify(dept));
    //    return this.http.post('api/departmentdata', JSON.stringify(dept[0]), this.options).map(this.extractData)
    //        .catch(this.handleError)
    //}

    //editDepartment(data): Observable<Object> {
    //    const dept = this.getServerDepartment(data);
    //    return this.http.put('api/Departmentdata', JSON.stringify(dept[0]), this.options).map(this.extractData)
    //        .catch(this.handleError)
    //}

    //private extractData(res: Response) {
    //    var array = [];
    //    let body = res.json() as Department;
    //    array.push(body || {});
    //    return array;
    //}
    //deleteDepartment(data): Observable<Object> {
    //    const dept = this.getServerDepartment(data);
    //    return this.http.delete('/api/Departmentdata/' + dept[0].DepartmentID).map(values =>
    //        dept);
    //}

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
