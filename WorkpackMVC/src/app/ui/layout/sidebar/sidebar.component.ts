import { SidebarMenuPipe } from './../../../pipes/sidebar/sidebarMenu.pipe';
import { Component, OnInit, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers/index';
import { Router, RouterLink } from '@angular/router';
import { LoadSidebarMenuAction } from './../../../actions/sidebar.actions';
import { Observable } from 'rxjs/Observable';
import { SidebarMenu } from './../../../models/sidebarMenu';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {

  sideBarMenu$: Observable<SidebarMenu[]>;
  authentication$: Observable<any>;

  constructor(private router: Router,
    private store: Store<fromRoot.AppState>) {
    this.authentication$ = this.store.select(fromRoot.getAuthStatus);
    this.sideBarMenu$ = this.store.select(fromRoot.getSideBarMenu)
      .map(a => a.entities);
  }

  ngOnInit() {
    this.store.dispatch(new LoadSidebarMenuAction(null));
  }

  getMenu(arrMenu: SidebarMenu[]) {
    return arrMenu.filter(
      menu => menu.ParentModuleID === 0);
  }

  getSubMenu(arrMenu: SidebarMenu[], MenuId: number) {
    return arrMenu.filter(
      menu => menu.ParentModuleID === MenuId);
  }

}
