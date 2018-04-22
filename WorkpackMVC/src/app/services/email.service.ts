import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmailService {

  constructor(private httpClient: HttpClient) {
  }

  public getEmailDetailsVParameters(): Observable<any> {
    return this.httpClient.get('/api/EmailDetails/GetEmailData?vParameters=12688,&ProjectID=1565&Type=INTERNAL')
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  public getListOfUsers(): Observable<any> {
    return this.httpClient.get('/api/EmailDetails/GetrecipientsData?&projectId=8322')
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  postemailDataVParameters(user, data): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post('/api/EmailDetails/addCheckerControllerFromMail?user=' + user + data,{ headers: headers })
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }
}
