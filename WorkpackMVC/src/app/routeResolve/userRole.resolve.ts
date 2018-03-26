import { UserService } from './../services/user.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class UserRoleResolve implements Resolve<Object> {
    constructor(private userService: UserService) {}
    resolve(route: ActivatedRouteSnapshot) {
      return this.userService.getUserRoleAssigned(route.params.id);
    }
}
