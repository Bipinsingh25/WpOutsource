import { Observable } from 'rxjs/Observable';
import { Designation } from './../models/designation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class DesignationService {
    // @LocalStorage() public token:Object = {};
    private apiLink: string = environment.API_ENDPOINT;

    constructor(private httpClient: HttpClient,
        private store: Store<fromRoot.AppState>,
        private router: Router) {
    }

    public create(designation: Designation): Observable<Designation> {
        return this.httpClient.post<Designation>('/api/designationdata', designation);
    }

    public update(designation: Designation): Observable<Designation> {
        return this.httpClient.put<Designation>('api/designationdata', designation);
    }

    public delete(designation: Designation): Observable<Designation> {
        return this.httpClient.delete<Designation>('/api/designationdata/' + designation.DesignationID);
    }

    public get(id: string): Observable<Designation> {
        return this.httpClient.get<Designation>('/api/designationdata/${id}');
    }

    //public get(id: string): Observable<Department> {
    //    return this.httpClient.get<Department>('/api/Departmentdata', {
    //        params: new HttpParams().set("id", id)
    //    });
    //}

    public list(): Observable<Array<Designation>> {
        return this.httpClient.get<Array<Designation>>('/api/designationdata');
    }



    //// returns an observable with department object
    //getDesignation(): Observable<Object> {

    //    this.store.select("designation")
    //        .take(1)
    //        .subscribe(desn => {
    //            return Observable.of(desn);
    //        });
        
    //    return this.httpClient.get('/api/designationdata').map(values =>
    //        values as Designation);

    //    //return Observable.of(role);

    //}

    //getServerDesignation(data): Designation[] {

    //    const designationList: Designation[] = [];
    //    for (let i = 0; i < data.length; i++) {
    //        if (data[i].DesignationID && data[i].DesignationName) {
    //            const designation: Designation = {
    //                DesignationID: null,
    //                DesignationName: null,
    //                DesignationCode: null,
    //            };
    //            designation.DesignationID = data[i].DesignationID;
    //            designation.DesignationName = data[i].DesignationName;
    //            designation.DesignationCode = data[i].DesignationCode;
    //            designationList.push(designation);
    //        }
    //    }
    //    return designationList;
    //}

    //addDesignation(data): Observable<Object> {
    //    const designation = this.getServerDesignation(data);
    //    //console.log(dept);
    //    localStorage.setItem('designation', JSON.stringify(designation));
    //    return this.http.post('api/designationdata', JSON.stringify(designation[0]), this.options).map(this.extractData)
    //        .catch(this.handleError)

    //    //return Observable.of(data);
    //}

    //editDesignation(data): Observable<Object> {
    //    const designation = this.getServerDesignation(data);
    //    return this.http.put('api/designationdata', JSON.stringify(designation[0]), this.options).map(this.extractData)
    //        .catch(this.handleError)



    //    //return Observable.of(role);
    //}
    //private extractData(res: Response) {
    //    var array = [];
    //    let body = res.json() as Designation;
    //    array.push(body || {});
    //    return array;
    //}
    //deleteDesignation(data): Observable<Object> {
    //    //debugger;
    //    const designation = this.getServerDesignation(data);
    //    return this.http.delete('/api/designationdata/' + designation[0].DesignationID).map(values =>
    //        designation);      
    //}

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
