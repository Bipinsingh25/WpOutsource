import { UserService } from './../services/user.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from "app/models/user";
import * as fromRoot from './../reducers/index';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';


@Injectable()
export class UserResolve implements Resolve<Object> {
  constructor(private userService: UserService,
    private store: Store<fromRoot.AppState>) { }
    resolve(activatedRoute: ActivatedRouteSnapshot) {
        let id = 0;
        id = activatedRoute.params.id;
        let user: User[];
        this.store.select(fromRoot.getAllUsers).subscribe(data => {
          user = _.head(_.filter(data, { 'UserID': +id }));
        });
        return user;
    }
}
