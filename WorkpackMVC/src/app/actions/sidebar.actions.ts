
import { Action } from './../reducers/action.interface';
import { SidebarMenu } from '../models/sidebarMenu';

export const ActionTypes = {
    LOAD_SIDEBARMENU: 'LOAD_SIDEBARMENU',
    LOAD_SIDEBARMENU_SUCCESS: 'LOAD_SIDEBARMENU_SUCCESS',
}

export class LoadSidebarMenuAction {
    type = ActionTypes.LOAD_SIDEBARMENU;
    constructor(public payload: Object) { }
}
export class SidebarMenuLoadedAction {
    type = ActionTypes.LOAD_SIDEBARMENU_SUCCESS;
    constructor(public payload: SidebarMenu[]) { }
}
