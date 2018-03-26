import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from './../models/client';
import { environment } from './../../environments/environment';

@Injectable()
export class ClientService {
    private apiLink: string = environment.API_ENDPOINT;
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
    }

    getAllClient(): Observable<Array<Client>> {

        const client = [
            {
                ClientID: 1,
                Clientname: 'Mahindra',
                ClientCode: 'Mahindra'
            },
            {
                ClientID: 2,
                Clientname: 'Mahindra 2',
                ClientCode: 'Mahindra 2'
            }
        ];

        return Observable.of(client);
    }

    public create(client: Client): Observable<Client> {
        return this.httpClient.post<Client>('/api/clientData', client);
    }

    public update(client: Client): Observable<Client> {
        return this.httpClient.put<Client>('api/clientData', client);
    }

    public delete(client: Client): Observable<Client> {
        return this.httpClient.delete<Client>('/api/clientData/' + client.ClientID);
    }

    public get(id: string): Observable<Client> {
        return this.httpClient.get<Client>('/api/clientData/${id}');
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