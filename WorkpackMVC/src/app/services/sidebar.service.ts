/**
 * TODO: ALL Observable<any> must be changed to concreate Observable of some type - VoidZero
 *
 */
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import * as fromSideBarActions from './../actions/sidebar.actions';
import * as reducer from './../reducers/sidebar.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SidebarMenu } from '../models/sidebarMenu';

@Injectable()
export class SidebarService {
    private menus: SidebarMenu[] = [];
    private apiLink: string = environment.API_ENDPOINT; // "http://localhost:3000";
    public total_pages: number;
    public loading = new Subject();

    // trips: Trip[];
    constructor(
        private httpClient: HttpClient,
        private store: Store<reducer.State>,
        private router: Router
    ) { }

	/**
	 * Get all trips for dashboard page
	 * @method getTrips
	 * @param
	 * @return {Observable} Observable of array of trips
	 */
    getMenus(pageParams): Observable<SidebarMenu[]> | Observable<String> {
        const headers = new Headers({
            'Content-Type': 'application/json'
            // 'Authorization': this.getUserAuthToken()
            // use Restangular which creates interceptor
        });

        const sidebarMenu: {
            ModuleID: number,
            ModuleName: string,
            routerLink:string,
            ParentModuleID: number,
            URL: string,
            AnchorClass: string,
            CountClass: string,
            SortOrder: string,
            MenuVisible: number,
            OrderMenuHeader: number,
            DisableManHours: number,
        }[] = [
                {
                    // tslint:disable-next-line:max-line-length
                    'ModuleID': 1, 'ModuleName': 'Admin', 'routerLink': '/userManagement', 'ParentModuleID': 0, 'URL': '', 'AnchorClass': '', 'CountClass': '', 'SortOrder': '', 'MenuVisible': 0, 'OrderMenuHeader': 0, 'DisableManHours': 0
                },
                {
                    // tslint:disable-next-line:max-line-length
                    'ModuleID': 2, 'ModuleName': 'User management', 'routerLink':'/userManagement', 'ParentModuleID': 1, 'URL': '', 'AnchorClass': '', 'CountClass': '', 'SortOrder': '', 'MenuVisible': 0, 'OrderMenuHeader': 0, 'DisableManHours': 0
                },
                {
                    // tslint:disable-next-line:max-line-length
                    'ModuleID': 3, 'ModuleName': 'Project management', 'routerLink': '/projectManagement', 'ParentModuleID': 1, 'URL': '', 'AnchorClass': '', 'CountClass': '', 'SortOrder': '', 'MenuVisible': 0, 'OrderMenuHeader': 0, 'DisableManHours': 0
                },
                {
                  // tslint:disable-next-line:max-line-length
                  'ModuleID': 4, 'ModuleName': 'Company management', 'routerLink': '/companySettingsManagement', 'ParentModuleID': 1, 'URL': '', 'AnchorClass': '', 'CountClass': '', 'SortOrder': '', 'MenuVisible': 0, 'OrderMenuHeader': 0, 'DisableManHours': 0
                },
                {
                  // tslint:disable-next-line:max-line-length
                  'ModuleID': 5, 'ModuleName': 'Communication settings management', 'routerLink': '/communicationSettingsManagement', 'ParentModuleID': 1, 'URL': '', 'AnchorClass': '', 'CountClass': '', 'SortOrder': '', 'MenuVisible': 0, 'OrderMenuHeader': 0, 'DisableManHours': 0
                },
                {
                  // tslint:disable-next-line:max-line-length
                  'ModuleID': 6, 'ModuleName': 'Miscellaneous management', 'routerLink': '/miscellaneousManagement', 'ParentModuleID': 1, 'URL': '', 'AnchorClass': '', 'CountClass': '', 'SortOrder': '', 'MenuVisible': 0, 'OrderMenuHeader': 0, 'DisableManHours': 0
                },
                {
                  // tslint:disable-next-line:max-line-length
                  'ModuleID': 7, 'ModuleName': 'Standard Repository', 'routerLink': '/stdRepository', 'ParentModuleID': 1, 'URL': '', 'AnchorClass': '', 'CountClass': '', 'SortOrder': '', 'MenuVisible': 0, 'OrderMenuHeader': 0, 'DisableManHours': 0
                }
            ];


        return Observable.of(sidebarMenu);

        // let url: string;
        // switch (pageParams['tripsType']) {
        //    case "feeds":
        //        url = `${this.apiLink}/trips.json/?page=${pageParams['page']}`;
        //        break;
        //    case "trending":
        //        url = `${this.apiLink}/trending/trips.json/?page=${pageParams['page']}`;
        //        break;
        // }
        //// Loading Trips
        // this.loading.next(true);

        // return this.http.get(url, { headers: headers })
        //    .map((data: Response) => {
        //        this.loading.next(false);
        //        let trips_data = data.json();
        //        this.total_pages = trips_data.total_pages;
        //        return trips_data.trips;
        //    })
        // .catch((res: Response) => this.catchError(res))
        // .finally(() => this.slimLoadingBarService.complete());
    }


    // catchError(response: Response): Observable<String> {
    //    if (response.status == 401) {
    //        this.authSerive.redirectToLogin();
    //        this.toastyService.warning({ title: "Login", msg: "You need to login." });
    //    } else {
    //        this.toastyService.error({ title: "Server Error", msg: "Something went wrong !!!" });
    //    }
    //    console.log('in catch error method');
    //    // not returning throw as it raises an error on the parent observable 
    //    // MORE INFO at https://youtu.be/3LKMwkuK0ZE?t=24m29s    
    //    return Observable.of('server error');
    //}
}
