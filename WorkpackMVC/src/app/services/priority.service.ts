import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Priority } from './../models/priority';
import { environment } from './../../environments/environment';

@Injectable()
export class PriorityService {
    private apiLink: string = environment.API_ENDPOINT;

    constructor(private httpClient: HttpClient) {
    }

    getAllPriority(): Observable<Array<Priority>> {
        const priority = [
            {
                PriorityID: 1,
                PriorityName: 'Low',
                Rank: 1,
                IsDefault: 'Y'
            },
            {
                PriorityID: 2,
                PriorityName: 'Medium',
                Rank: 2,
                IsDefault: 'N'
            }
        ];

        return Observable.of(priority);
    }

    public create(priority: Priority): Observable<Priority> {
        return this.httpClient.post<Priority>('/api/prioritydata', priority);
    }

    public update(priority: Priority): Observable<Priority> {
        return this.httpClient.put<Priority>('api/prioritydata', priority);
    }

    public delete(priority: Priority): Observable<Priority> {
        return this.httpClient.delete<Priority>('/api/prioritydata/' + priority.PriorityID);
    }

    public get(id: string): Observable<Priority> {
        return this.httpClient.get<Priority>('/api/prioritydata/${id}');
    }

    //public get(id: string): Observable<Department> {
    //    return this.httpClient.get<Department>('/api/Departmentdata', {
    //        params: new HttpParams().set("id", id)
    //    });
    //}

    public list(): Observable<Array<Priority>> {
        return this.httpClient.get<Array<Priority>>('/api/prioritydata');
    }

}