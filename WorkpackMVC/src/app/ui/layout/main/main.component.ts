import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers/index';
import { Router } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-main',
  template: `
      <div class="page-container">
        <app-sidebar></app-sidebar>
        <div class="page-content-wrapper">
          <div class="page-content" style="margin-top:-10px;">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    `,
  styles: []
})
export class MainComponent implements OnInit {

  authStatus$: Observable<any>;
  constructor(private store: Store<fromRoot.AppState>,
    private router: Router) {
    this.authStatus$ = this.store.select(fromRoot.getAuthStatus);
  }

  ngOnInit() {

    this.authStatus$.subscribe(
      data => {
        if (data === true) {
          let body = document.getElementsByTagName('body')[0];
          body.classList.remove('login');
          body.classList.add('page-container-bg-solid');
          body.classList.add('page-header-fixed');
          body.classList.add('page-sidebar-closed-hide-logo');
        }
        else {
          debugger;
          let body = document.getElementsByTagName('body')[0];
          body.classList.add('login');
          body.classList.remove('page-container-bg-solid');
          body.classList.remove('page-header-fixed');
          body.classList.remove('page-sidebar-closed-hide-logo');
          this.router.navigateByUrl('/auth/login')
        }
      }
    )


  }
}
