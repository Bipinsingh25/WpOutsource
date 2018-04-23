import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserProfileService {

  constructor(private httpClient: HttpClient) { }

  public getUserProfileData(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>('/api/UsersData/GetUserProfileData');
  }

}
