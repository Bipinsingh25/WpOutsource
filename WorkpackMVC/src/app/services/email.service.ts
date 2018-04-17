import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmailService {

  constructor(private httpClient:HttpClient) { }

  public getEmailDetailsVParameters(): Observable<any> {
    return this.httpClient.get('/api/EmailDetails/GetEmailData?vParameters=12688,&ProjectID=1565&Type=INTERNAL')
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }
}
