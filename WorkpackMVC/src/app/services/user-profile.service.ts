import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserProfileService {

  constructor(private httpClient: HttpClient) {
  }

  public getUserProfileData(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>('/api/UsersData/GetUserProfileData');
  }

  public postPersonalInfo(location, skills, technology, experience): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post('/api/UsersData/UpdateUserProfile?userSkills=' + skills + '&userTechnologies=' + technology + '&userLocation=' + location + '&userQualifications=' + experience, {headers: headers})
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  public changePassword(oldPassword, newPassword): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post('/api/UsersData/ChangeUserPassword?newPassword=' + newPassword + '&oldPassword=' + oldPassword, {headers: headers})
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  public integrateUserSMPT(smtpHost, password): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post('/api/UsersData/IntegrateUserSMPT?SMTPHost=' + smtpHost + '&EmailPassword=' + password, {headers: headers})
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }

  public sendSMTPVerificationEmail(smtpHost, password): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post('/api/UsersData/SendSMTPVerificationEmail?SMTPHost=' + smtpHost + '&EmailPassword=' + password, {headers: headers})
      .map((res: Response) => res)
      .catch((error: HttpErrorResponse) => Observable.throw(error.error || 'Server error'));
  }


}

