import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from './../models/client';
import { environment } from './../../environments/environment';

@Injectable()
export class ProjectsAdminService {
  private apiLink: string = environment.API_ENDPOINT;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
  }

  public create(client: Client): Observable<Client> {
    return this.httpClient.post<Client>('/api/projectsAdminData', client);
  }

  public update(client: Client): Observable<Client> {
    return this.httpClient.put<Client>('api/projectsAdminData', client);
  }

  public delete(client: Client): Observable<Client> {
    return this.httpClient.delete<Client>('/api/projectsAdminData/' + client.ClientID);
  }

  public get(id: string): Observable<Client> {
    return this.httpClient.get<Client>('/api/projectsAdminData/${id}');
  }

  //public get(id: string): Observable<Client> {
  //    return this.httpClient.get<Client>('/api/clientData', {
  //        params: new HttpParams().set("id", id)
  //    });
  //}

  public list(): Observable<Array<Client>> {
    return this.httpClient.get<Array<Client>>('/api/clientData');
  }

}
