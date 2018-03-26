import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
//import { AuthService } from './../app/services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private tokenKey = "token";
  private token: string;
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getLocalToken()}`
      }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
        debugger;
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          this.router.navigate(['/auth/login']);
        }
      }
    });
  }

  getLocalToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(this.tokenKey);
    }
    return this.token;
  }

}
