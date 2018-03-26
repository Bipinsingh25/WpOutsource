import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { NormSet } from './../models/projectTemplate';

@Injectable()
export class ProjectTemplateService {
  private apiLink: string = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) {
  }

  public create(normSet: NormSet): Observable<NormSet> {
    return this.httpClient.post<NormSet>('/api/NormSetData', normSet);
  }

  public update(normSet: NormSet): Observable<NormSet> {
    return this.httpClient.put<NormSet>('api/NormSetData', normSet);
  }

  public delete(normSet: NormSet): Observable<NormSet> {
    return this.httpClient.delete<NormSet>('/api/NormSetData/' + normSet.NormSetID);
  }

  public get(id: string): Observable<NormSet> {
    return this.httpClient.get<NormSet>('/api/NormSetData/${id}');
  }

  //public get(id: string): Observable<ExUser> {
  //    return this.httpClient.get<ExUser>('/api/NormSetData', {
  //        params: new HttpParams().set("id", id)
  //    });
  //}

  public list(): Observable<Array<NormSet>> {
    return this.httpClient.get<Array<NormSet>>('/api/NormSetData');
  }

  getAllProjectTemplate(): Observable<Object> {

    const projectTemplate = [
      {
        NormSetID: 1,
        NormSetName: 'NormSet 1',
        ClientID: 1,
        ProjectType: 1,
        ProjectStage: 1,
        NormSetType: 'NormSetType 1',
        ProjectID: 1,
        IsDefault: 'N',
      }
    ];

    return Observable.of(projectTemplate);

  }

}
