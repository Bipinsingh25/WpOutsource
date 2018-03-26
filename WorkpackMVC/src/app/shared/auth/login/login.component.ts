import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromRoot from './../../../reducers/index';
import { ServerLoginAction } from '../../../actions/user-auth.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  authStatus$: Observable<boolean>;
  authToken$: Observable<any>;

  constructor(private fb: FormBuilder,
    private store: Store<fromRoot.AppState>,
    private router: Router) {
    this.authToken$ = this.store.select(fromRoot.getToken);
    this.authStatus$ = this.store.select(fromRoot.getAuthStatus);
    debugger;
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm()
  }

  onSubmit() {
    const values = this.signInForm.value;
    const payload = { data: values }
    this.store.dispatch(new ServerLoginAction(payload));
  }

  initForm() {
    const email = '';
    const password = '';

    this.signInForm = this.fb.group({
      'email': [email, Validators.required],
      'password': [password, Validators.required]
    });
  }

  redirectIfUserLoggedIn() {
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl('/userManagement')
    }

    this.authStatus$.subscribe(
      data => {
        if (data === true) {
          this.router.navigateByUrl('/userManagement')
        }
      }
    );
    this.authToken$.subscribe(
      data => {
        if (data) {
          localStorage.setItem('token', data);
        }
      }
    );

  }

}
