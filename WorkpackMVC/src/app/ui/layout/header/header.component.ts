import { Router } from '@angular/router';
import { ServerAuthService } from './../../../services/server-auth.service';
import { Store } from '@ngrx/store';
import { UserProfile } from './../../../models/user-profile';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as fromRoot from './../../../reducers/index';
import { ServerLoginSuccessAction, ServerLogoutAction, GetHeaderNotificationAction } from './../../../actions/user-auth.action';
import { element } from 'protractor';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserProfile>;
  authStatus$: Observable<any>;
  notification$: Observable<any>;
  constructor(
    private store: Store<fromRoot.AppState>,
    private serverAuthService: ServerAuthService,
    private router: Router
  ) {
    this.user$ = this.store.select(fromRoot.getUserProfile);
    this.authStatus$ = this.store.select(fromRoot.getAuthStatus);
    this.notification$ = this.store.select(fromRoot.getNotification);

    // Check if the user is already logged in
    const user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {

      setInterval(() => {
        const user: UserProfile = this.serverAuthService.getServerUserProfile(user_data);
        this.store.dispatch(new GetHeaderNotificationAction(user));
      }, 2000)

      // let user = this.serverAuthService.getLoggedInUser(user_data.auth_token);
      // user.subscribe(
      //    // Dispatch login success when the we get the user object
      //    data => this.store.dispatch(new ServerLoginSuccessAction(data))
      //    // if required do anyredirects after this
      // )
    }
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new ServerLogoutAction());
  }

}
