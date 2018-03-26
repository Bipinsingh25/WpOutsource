import { Observable } from 'rxjs/Observable';
import { UserProfile } from './../models/user-profile';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { RequestResult } from 'app/models/RequestResult';
import { User } from 'app/models/user';

@Injectable()
export class ServerAuthService {
  authUser: Observable<UserProfile>;
  // @LocalStorage() public token:Object = {};
  private apiLink: string = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient,
    private store: Store<fromRoot.AppState>,
    private router: Router
  ) {
    this.authUser = this.store.select(fromRoot.getUserProfile)
  }

  getLoggedInUser(auth_token): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': auth_token
    })
    return this.httpClient.post(`${this.apiLink}/users/show.json`, {}, { headers: headers })
      .map(data => this.getServerUserProfile(data));
  }

  login(data): Observable<any> {

    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('username', data.email);
    Params = Params.append('password', data.password);


    return this.httpClient.post<RequestResult>("/api/Token", { params: Params });
    //.map(response => {
    //  let result = response as RequestResult;
    //  if (result.State == 1) {
    //    let json = result.Data as any;
    //    localStorage.setItem("token", json.accessToken);
    //    return Observable.of(json);
    //  }
    //});

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // returns an observable with user object
  //login(data): Observable<Object> {
  //    const headers = new Headers({
  //        'Content-Type': 'application/json'
  //    });

  //    const userDummy = {
  //        UserId: '1',
  //        CompanyId: '10',
  //        name: 'Mangesh wagh',
  //        email: 'Mangeshwagh87@gmail.com',
  //        profilePic: '',
  //        token: '12345',
  //    };


  //    this.setTokenInLocalStorage(userDummy);

  //    return Observable.of(userDummy);

  //    // return this.http.post(`${this.apiLink}/authenticate.json`,
  //    //     JSON.stringify(data), { headers: headers }
  //    // ).map((res: Response) => {
  //    //     // Setting token after login
  //    //     this.setTokenInLocalStorage(res.json())
  //    //     return res.json();
  //    // }).catch((res: Response) => this.catchError(res));

  //}

  catchError(response: Response): Observable<String> {
    console.log('in catch error method');
    // not returning throw as it raises an error on the parent observable
    // MORE INFO at https://youtu.be/3LKMwkuK0ZE?t=24m29s
    return Observable.of('server error');
  }

  signOut(): Observable<String> {
    debugger;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return Observable.of('ok logged out');
  }

  getHeaderNotification(data): Observable<Object> {

    const notification = [{
      NotificationID: 1,
      Notification: 'New user registered.',
      Date: '12 min ago',
      UserID: '1',
      NotificationFor: '1',
      Read: 'Y'
    },
    {
      NotificationID: 2,
      Notification: 'Server #12 overloaded. ',
      Date: '1 hr ago',
      UserID: '1',
      NotificationFor: '1',
      Read: 'N'
    }];

    return Observable.of(notification);
  }

  getServerUserProfile(data): UserProfile {
    return {
      UserId: data.UserId,
      CompanyId: data.CompanyId,
      name: data.name,
      email: data.email,
      profilePic: data.profile_pic,
      token: data.auth_token
    }
  }

  setTokenInLocalStorage(user_data): void {
    const jsonData = JSON.stringify(user_data)
    localStorage.setItem('user', jsonData);
  }

  belongsToLoggedInUser(user_id): Observable<boolean> {
    return this.authUser.map((user) => user.UserId === user_id)
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

}
