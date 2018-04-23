import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {Action} from './../reducers/action.interface';
import * as fromRoot from '../reducers';
import {Observable} from "rxjs/Observable";
import * as UserProfileActions from '../actions/userProfile.actions';
// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import {UserProfileService} from '../services/user-profile.service';


@Injectable()
export class UserProfileEffects {

  constructor(private actions$: Actions,
              private userProfileService: UserProfileService,
              private store: Store<fromRoot.AppState>) {
  }

  @Effect()
  get_user_profile_data$: Observable<Action> = this.actions$
    .ofType(UserProfileActions.ActionTypes.GET_USER_PROFILE_DATA)
    .switchMap((action: Action) => {
      return this.userProfileService.getUserProfileData();
    })
    .filter(data => data !== null)
    .map((data) => {
      return new UserProfileActions.GetUserProfileDataSuccessAction(data);
    });
}
